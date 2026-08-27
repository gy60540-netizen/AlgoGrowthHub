import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { MediaService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AppError } from '../../utils/AppError.js';
import { AuditLogService } from '../auditLogs/service.js';

export class MediaController {
  public static async uploadFile(req: AuthRequest, res: Response): Promise<void> {
    if (!req.file) {
      throw new AppError('No file uploaded', 400, 'UPLOAD_ERROR');
    }

    const altText = req.body.altText;
    const media = await MediaService.saveUploadedFile(req.file, req.user?.userId, altText);

    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'MEDIA_UPLOADED',
      resourceType: 'Media',
      resourceId: media.id,
      metadata: { fileName: media.fileName, mimeType: media.mimeType, size: media.fileSize },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });

    sendCreated(res, media, 'File uploaded successfully');
  }

  public static async getAllMedia(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 30;

    const result = await MediaService.getAllMediaAdmin({ page, limit });
    sendSuccess(res, result.media, 200, 'Media library fetched successfully', result.pagination);
  }

  public static async deleteMedia(req: AuthRequest, res: Response): Promise<void> {
    await MediaService.deleteMedia(req.params.id as string);

    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'MEDIA_DELETED',
      resourceType: 'Media',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });

    sendSuccess(res, null, 200, 'Media deleted successfully');
  }
}
