import { AuditLog, IAuditLog } from './model.js';

export class AuditLogService {
  public static async log(data: {
    actorUserId?: string;
    actorEmail?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<IAuditLog> {
    return AuditLog.create(data);
  }

  public static async getLogs(query: {
    page?: number;
    limit?: number;
    action?: string;
    resourceType?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (query.action) filter.action = query.action;
    if (query.resourceType) filter.resourceType = query.resourceType;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      AuditLog.countDocuments(filter),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
