import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { ClientResultsService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class ClientResultsController {
  public static async getPublishedResults(req: Request, res: Response): Promise<void> {
    const featuredOnly = req.query.featured === 'true';
    const results = await ClientResultsService.getPublishedResults(featuredOnly);
    sendSuccess(res, results, 200, 'Published client results fetched successfully');
  }

  public static async getAllResultsAdmin(_req: AuthRequest, res: Response): Promise<void> {
    const results = await ClientResultsService.getAllResultsAdmin();
    sendSuccess(res, results, 200, 'Admin client results list fetched successfully');
  }

  public static async getResultById(req: Request, res: Response): Promise<void> {
    const result = await ClientResultsService.getResultById(req.params.id as string);
    sendSuccess(res, result, 200, 'Client result fetched successfully');
  }

  public static async createResult(req: AuthRequest, res: Response): Promise<void> {
    const result = await ClientResultsService.createResult(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CLIENT_RESULT_CREATED',
      resourceType: 'ClientResult',
      resourceId: result.id,
      metadata: { clientName: result.clientName, rating: result.rating },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, result, 'Client result created successfully');
  }

  public static async updateResult(req: AuthRequest, res: Response): Promise<void> {
    const result = await ClientResultsService.updateResult(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CLIENT_RESULT_UPDATED',
      resourceType: 'ClientResult',
      resourceId: result.id,
      metadata: { clientName: result.clientName, isPublished: result.isPublished },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, result, 200, 'Client result updated successfully');
  }

  public static async deleteResult(req: AuthRequest, res: Response): Promise<void> {
    await ClientResultsService.deleteResult(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CLIENT_RESULT_DELETED',
      resourceType: 'ClientResult',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Client result deleted successfully');
  }
}
