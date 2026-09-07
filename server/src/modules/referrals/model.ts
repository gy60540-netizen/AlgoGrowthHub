import mongoose, { Schema, Document } from 'mongoose';

export interface IReferralLink {
  _id?: mongoose.Types.ObjectId;
  code: string;
  resourceId?: mongoose.Types.ObjectId;
  resourceTitle?: string;
  targetUrl: string;
  clicksCount: number;
  viewsCount: number;
  salesCount: number;
  revenueGenerated: number;
  isActive: boolean;
  createdAt: Date;
}

export interface IReferralPartner extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'DISABLED';
  links: IReferralLink[];
  notes?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReferralClick extends Document {
  referralCode: string;
  partnerId?: mongoose.Types.ObjectId;
  resourceId?: mongoose.Types.ObjectId;
  visitorId?: string;
  landingPath?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  createdAt: Date;
}

const referralLinkSchema = new Schema<IReferralLink>(
  {
    code: { type: String, required: true, uppercase: true, trim: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: false },
    resourceTitle: { type: String, trim: true },
    targetUrl: { type: String, default: '/' },
    clicksCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    revenueGenerated: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const referralPartnerSchema = new Schema<IReferralPartner>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    status: { type: String, enum: ['ACTIVE', 'DISABLED'], default: 'ACTIVE' },
    links: [referralLinkSchema],
    notes: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

referralPartnerSchema.index({ email: 1 });
referralPartnerSchema.index({ 'links.code': 1 });

const referralClickSchema = new Schema<IReferralClick>(
  {
    referralCode: { type: String, required: true, uppercase: true, trim: true, index: true },
    partnerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource' },
    visitorId: { type: String, index: true },
    landingPath: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
  }
);

export const ReferralPartner = mongoose.model<IReferralPartner>('ReferralPartner', referralPartnerSchema);
export const ReferralClick = mongoose.model<IReferralClick>('ReferralClick', referralClickSchema);
