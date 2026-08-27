import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { ResourcesService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class ResourcesController {
  public static async getPublishedResources(req: Request, res: Response): Promise<void> {
    const featuredOnly = req.query.featured === 'true';
    const resources = await ResourcesService.getPublishedResources(featuredOnly);
    sendSuccess(res, resources, 200, 'Published resources fetched successfully');
  }

  public static async getResourceBySlug(req: Request, res: Response): Promise<void> {
    const resource = await ResourcesService.getResourceBySlug(req.params.slug as string);
    sendSuccess(res, resource, 200, 'Resource details fetched successfully');
  }

  public static async download(req: Request, res: Response): Promise<void> {
    const token = req.query.token as string | undefined;
    const downloadData = await ResourcesService.processDownloadAccess(req.params.id as string, token);
    sendSuccess(res, downloadData, 200, 'Download access verified');
  }

  public static async getAllResourcesAdmin(_req: AuthRequest, res: Response): Promise<void> {
    const resources = await ResourcesService.getAllResourcesAdmin();
    sendSuccess(res, resources, 200, 'Admin resources list fetched successfully');
  }

  public static async getResourceById(req: AuthRequest, res: Response): Promise<void> {
    const resource = await ResourcesService.getResourceById(req.params.id as string);
    sendSuccess(res, resource, 200, 'Resource details fetched successfully');
  }

  public static async createResource(req: AuthRequest, res: Response): Promise<void> {
    const resource = await ResourcesService.createResource(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'RESOURCE_CREATED',
      resourceType: 'Resource',
      resourceId: resource.id,
      metadata: { title: resource.title, type: resource.type, price: resource.price },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, resource, 'Resource created successfully');
  }

  public static async updateResource(req: AuthRequest, res: Response): Promise<void> {
    const resource = await ResourcesService.updateResource(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'RESOURCE_UPDATED',
      resourceType: 'Resource',
      resourceId: resource.id,
      metadata: { title: resource.title, price: resource.price, isPublished: resource.isPublished },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, resource, 200, 'Resource updated successfully');
  }

  public static async deleteResource(req: AuthRequest, res: Response): Promise<void> {
    await ResourcesService.deleteResource(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'RESOURCE_DELETED',
      resourceType: 'Resource',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Resource deleted successfully');
  }
}
