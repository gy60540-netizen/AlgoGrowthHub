import mongoose, { Schema, Document } from 'mongoose';
import { CONTENT_STATUS, ContentStatus } from '../../config/constants.js';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  image: string;
  features: string[];
  ctaLabel: string;
  status: ContentStatus;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    image: { type: String, required: true },
    features: { type: [String], default: [] },
    ctaLabel: { type: String, default: 'Read More →' },
    status: {
      type: String,
      enum: Object.values(CONTENT_STATUS),
      default: CONTENT_STATUS.PUBLISHED,
    },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ order: 1, isPublished: 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
