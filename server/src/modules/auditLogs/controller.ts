import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { AuditLogService } from './service.js';
import { sendSuccess } from '../../utils/response.js';

export class AuditLogController {
  public static async getLogs(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const action = req.query.action as string | undefined;
    const resourceType = req.query.resourceType as string | undefined;

    const result = await AuditLogService.getLogs({ page, limit, action, resourceType });
    sendSuccess(res, result.logs, 200, 'Audit logs fetched successfully', result.pagination);
  }
}
