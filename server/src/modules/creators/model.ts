import mongoose, { Schema, Document } from 'mongoose';
import { CONTENT_STATUS, ContentStatus } from '../../config/constants.js';

export interface ICreator extends Document {
  name: string;
  profileImage: string;
  bio: string;
  niche: string;
  instagramUsername: string;
  instagramUrl: string;
  followerCount: string;
  isFeatured: boolean;
  order: number;
  status: ContentStatus;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const creatorSchema = new Schema<ICreator>(
  {
    name: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true },
    bio: { type: String, required: true },
    niche: { type: String, required: true, trim: true },
    instagramUsername: { type: String, required: true, trim: true },
    instagramUrl: { type: String, required: true, trim: true },
    followerCount: { type: String, required: true, trim: true },
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

creatorSchema.index({ isPublished: 1, isFeatured: 1, order: 1 });

export const Creator = mongoose.model<ICreator>('Creator', creatorSchema);
