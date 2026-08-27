import mongoose, { Schema, Document } from 'mongoose';
import { CONTENT_STATUS, ContentStatus } from '../../config/constants.js';

export interface IResource extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  fileKey: string;
  fileName: string;
  fileSize?: number;
  type: 'free' | 'premium';
  fileFormat: 'pdf' | 'zip' | 'mp4';
  price: number; // in INR
  currency: string;
  isFeatured: boolean;
  order: number;
  status: ContentStatus;
  isPublished: boolean;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    thumbnail: { type: String, required: true },
    fileKey: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number },
    type: { type: String, enum: ['free', 'premium'], required: true, default: 'free' },
    fileFormat: { type: String, enum: ['pdf', 'zip', 'mp4'], required: true, default: 'pdf' },
    price: {
      type: Number,
      default: 0,
      validate: {
        validator: function (this: IResource, val: number) {
          if (this.type === 'premium') {
            return val > 0;
          }
          return val >= 0;
        },
        message: 'Premium resources must have a price greater than 0',
      },
    },
    currency: { type: String, default: 'INR' },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(CONTENT_STATUS),
      default: CONTENT_STATUS.PUBLISHED,
    },
    isPublished: { type: Boolean, default: true },
    downloadCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

resourceSchema.index({ isPublished: 1, isFeatured: 1, type: 1, order: 1 });

export const Resource = mongoose.model<IResource>('Resource', resourceSchema);
