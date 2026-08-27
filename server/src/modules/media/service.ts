import fs from 'fs';
import path from 'path';
import { Media, IMedia } from './model.js';
import { AppError } from '../../utils/AppError.js';

export class MediaService {
  public static async saveUploadedFile(
    file: Express.Multer.File,
    userId?: string,
    altText?: string
  ): Promise<IMedia> {
    const relativeUrl = `/uploads/${file.filename}`;

    const media = await Media.create({
      url: relativeUrl,
      storageKey: file.filename,
      fileName: file.filename,
      originalName: file.originalname,
      altText: altText || file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      uploadedBy: userId,
    });

    return media;
  }

  public static async getAllMediaAdmin(query: { page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 30;
    const skip = (page - 1) * limit;

    const [media, total] = await Promise.all([
      Media.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Media.countDocuments(),
    ]);

    return {
      media,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  public static async deleteMedia(id: string): Promise<void> {
    const media = await Media.findById(id);
    if (!media) {
      throw new AppError('Media not found', 404, 'NOT_FOUND');
    }

    const filePath = path.join(process.cwd(), 'uploads', media.fileName);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Failed to delete file from disk:', err);
      }
    }

    await Media.findByIdAndDelete(id);
  }
}
