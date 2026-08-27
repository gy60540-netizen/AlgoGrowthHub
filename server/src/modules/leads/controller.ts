import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { LeadsService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { LeadStatus } from '../../config/constants.js';
import { AuditLogService } from '../auditLogs/service.js';

export class LeadsController {
  public static async createLead(req: Request, res: Response): Promise<void> {
    const lead = await LeadsService.createLead(req.body);
    sendCreated(res, lead, 'Thank you! We will get in touch with you shortly.');
  }

  public static async getLeadsAdmin(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const status = req.query.status as LeadStatus;

    const result = await LeadsService.getLeadsAdmin({ page, limit, status });
    sendSuccess(res, result.leads, 200, 'Leads retrieved successfully', result.pagination);
  }

  public static async getLeadById(req: AuthRequest, res: Response): Promise<void> {
    const lead = await LeadsService.getLeadById(req.params.id as string);
    sendSuccess(res, lead, 200, 'Lead retrieved successfully');
  }

  public static async updateLead(req: AuthRequest, res: Response): Promise<void> {
    const lead = await LeadsService.updateLead(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'LEAD_STATUS_UPDATED',
      resourceType: 'Lead',
      resourceId: lead.id,
      metadata: { status: lead.status, name: lead.name },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, lead, 200, 'Lead updated successfully');
  }

  public static async deleteLead(req: AuthRequest, res: Response): Promise<void> {
    await LeadsService.deleteLead(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'LEAD_DELETED',
      resourceType: 'Lead',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Lead deleted successfully');
  }
}
