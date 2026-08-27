import mongoose, { Schema, Document } from 'mongoose';
import { LEAD_STATUS, LeadStatus } from '../../config/constants.js';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  instagram?: string;
  service?: string;
  budgetRange?: string;
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
    instagram: { type: String, trim: true },
    service: { type: String, trim: true },
    budgetRange: { type: String },
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
leadSchema.index({ email: 1 });

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
