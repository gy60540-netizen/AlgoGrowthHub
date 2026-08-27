import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { CreatorsService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class CreatorsController {
  public static async getPublishedCreators(req: Request, res: Response): Promise<void> {
    const featuredOnly = req.query.featured === 'true';
    const creators = await CreatorsService.getPublishedCreators(featuredOnly);
    sendSuccess(res, creators, 200, 'Published creators fetched successfully');
  }

  public static async getAllCreatorsAdmin(_req: AuthRequest, res: Response): Promise<void> {
    const creators = await CreatorsService.getAllCreatorsAdmin();
    sendSuccess(res, creators, 200, 'Admin creators list fetched successfully');
  }

  public static async getCreatorById(req: Request, res: Response): Promise<void> {
    const creator = await CreatorsService.getCreatorById(req.params.id as string);
    sendSuccess(res, creator, 200, 'Creator fetched successfully');
  }

  public static async createCreator(req: AuthRequest, res: Response): Promise<void> {
    const creator = await CreatorsService.createCreator(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CREATOR_CREATED',
      resourceType: 'Creator',
      resourceId: creator.id,
      metadata: { name: creator.name, instagramUsername: creator.instagramUsername },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, creator, 'Creator created successfully');
  }

  public static async updateCreator(req: AuthRequest, res: Response): Promise<void> {
    const creator = await CreatorsService.updateCreator(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CREATOR_UPDATED',
      resourceType: 'Creator',
      resourceId: creator.id,
      metadata: { name: creator.name, isPublished: creator.isPublished },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, creator, 200, 'Creator updated successfully');
  }

  public static async deleteCreator(req: AuthRequest, res: Response): Promise<void> {
    await CreatorsService.deleteCreator(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'CREATOR_DELETED',
      resourceType: 'Creator',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Creator deleted successfully');
  }
}
