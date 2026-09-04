import mongoose, { Schema, Document } from 'mongoose';
import { LEAD_STATUS, LeadStatus } from '../../config/constants.js';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  platform?: string;
  socialLink?: string;
  instagram?: string;
  service?: string;
  followerCount?: string;
  budgetRange?: string;
  leadType?: string;
  message?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    platform: { type: String, trim: true, default: 'Instagram' },
    socialLink: { type: String, trim: true },
    instagram: { type: String, trim: true },
    service: { type: String, trim: true },
    followerCount: { type: String, trim: true },
    budgetRange: { type: String },
    leadType: { type: String, default: 'CREATOR_APPLICATION' },
    message: { type: String },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ leadType: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
