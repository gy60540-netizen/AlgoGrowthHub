import mongoose, { Schema, Document } from 'mongoose';
import { CONTENT_STATUS, ContentStatus } from '../../config/constants.js';

export interface IExpertTeamMember extends Document {
  name: string;
  image: string;
  role: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  isFeatured: boolean;
  order: number;
  status: ContentStatus;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const expertTeamSchema = new Schema<IExpertTeamMember>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    role: { type: String, required: true, trim: true },
    instagramUrl: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
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

expertTeamSchema.index({ isPublished: 1, isFeatured: 1, order: 1 });

export const ExpertTeamMember = mongoose.model<IExpertTeamMember>('ExpertTeamMember', expertTeamSchema);
