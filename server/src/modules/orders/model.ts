import mongoose, { Schema, Document } from 'mongoose';
import { ORDER_STATUS, OrderStatus } from '../../config/constants.js';

export interface IOrder extends Document {
  userEmail: string;
  userName?: string;
  userPhone?: string;
  resourceId?: mongoose.Types.ObjectId;
  bookingId?: mongoose.Types.ObjectId;
  orderType?: 'RESOURCE_PURCHASE' | 'STRATEGY_BOOKING';
  amount: number;
  currency: string;
  provider: 'mock' | 'razorpay' | 'stripe';
  providerOrderId?: string;
  providerPaymentId?: string;
  providerSignature?: string;
  status: OrderStatus;
  downloadToken?: string;
  downloadExpiresAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    userName: { type: String, trim: true },
    userPhone: { type: String, trim: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: false },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: false },
    orderType: { type: String, enum: ['RESOURCE_PURCHASE', 'STRATEGY_BOOKING'], default: 'RESOURCE_PURCHASE' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    provider: { type: String, enum: ['mock', 'razorpay', 'stripe'], default: 'mock' },
    providerOrderId: { type: String },
    providerPaymentId: { type: String },
    providerSignature: { type: String },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED,
    },
    downloadToken: { type: String },
    downloadExpiresAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ userEmail: 1, resourceId: 1 });
orderSchema.index({ providerOrderId: 1 });
orderSchema.index({ downloadToken: 1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
