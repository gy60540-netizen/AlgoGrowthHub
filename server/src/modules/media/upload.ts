import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from '../../utils/AppError.js';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  // Documents / Archives / Video
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'video/mp4',
];

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB max limit
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Unsupported file format: ${file.mimetype}. Allowed formats: JPEG, PNG, WebP, AVIF, PDF, ZIP, MP4.`,
          400,
          'INVALID_FILE'
        )
      );
    }
  },
});
