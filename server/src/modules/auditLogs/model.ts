import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actorUserId?: mongoose.Types.ObjectId;
  actorEmail?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    actorUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    actorEmail: { type: String },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ resourceType: 1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
