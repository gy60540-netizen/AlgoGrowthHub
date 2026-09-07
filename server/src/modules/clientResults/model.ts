import mongoose, { Schema, Document } from 'mongoose';
import { CONTENT_STATUS, ContentStatus } from '../../config/constants.js';

export interface IClientResult extends Document {
  clientName: string;
  description?: string;
  instagramUrl?: string;
  beforeImage: string;
  afterImage: string;
  rating: number; // 1 to 5
  isFeatured: boolean;
  order: number;
  status: ContentStatus;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const clientResultSchema = new Schema<IClientResult>(
  {
    clientName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    instagramUrl: { type: String, trim: true },
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(CONTENT_STATUS),
      default: CONTENT_STATUS.PUBLISHED,
    },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

clientResultSchema.index({ isPublished: 1, isFeatured: 1, order: 1 });

export const ClientResult = mongoose.model<IClientResult>('ClientResult', clientResultSchema);
