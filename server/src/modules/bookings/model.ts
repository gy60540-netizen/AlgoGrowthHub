import mongoose, { Schema, Document } from 'mongoose';
import { BOOKING_STATUS, BookingStatus } from '../../config/constants.js';

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    service: { type: String, required: true, trim: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    timezone: { type: String, default: 'IST (UTC+5:30)' },
    message: { type: String },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ email: 1 });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
