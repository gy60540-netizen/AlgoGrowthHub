import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  url: string;
  storageKey: string;
  fileName: string;
  originalName: string;
  altText?: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    storageKey: { type: String, required: true },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    altText: { type: String },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ createdAt: -1 });

export const Media = mongoose.model<IMedia>('Media', mediaSchema);
