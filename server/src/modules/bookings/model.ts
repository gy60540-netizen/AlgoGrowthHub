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
  amount: number;
  currency: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  provider?: string;
  providerOrderId?: string;
  providerPaymentId?: string;
  providerSignature?: string;
  partnerId?: mongoose.Types.ObjectId;
  referralCode?: string;
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
    amount: { type: Number, default: 999 },
    currency: { type: String, default: 'INR' },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    provider: { type: String },
    providerOrderId: { type: String },
    providerPaymentId: { type: String },
    providerSignature: { type: String },
    partnerId: { type: Schema.Types.ObjectId, ref: 'User' },
    referralCode: { type: String, uppercase: true, trim: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ email: 1 });
bookingSchema.index({ preferredDate: 1 });
bookingSchema.index({ partnerId: 1 });
bookingSchema.index({ referralCode: 1 });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
