import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { ServicesService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class ServicesController {
  public static async getPublishedServices(_req: Request, res: Response): Promise<void> {
    const services = await ServicesService.getPublishedServices();
    sendSuccess(res, services, 200, 'Published services fetched successfully');
  }

  public static async getServiceBySlug(req: Request, res: Response): Promise<void> {
    const service = await ServicesService.getServiceBySlug(req.params.slug as string);
    sendSuccess(res, service, 200, 'Service details fetched successfully');
  }

  public static async getAllServicesAdmin(_req: AuthRequest, res: Response): Promise<void> {
    const services = await ServicesService.getAllServicesAdmin();
    sendSuccess(res, services, 200, 'Admin services list fetched successfully');
  }

  public static async getServiceById(req: AuthRequest, res: Response): Promise<void> {
    const service = await ServicesService.getServiceById(req.params.id as string);
    sendSuccess(res, service, 200, 'Service details fetched successfully');
  }

  public static async createService(req: AuthRequest, res: Response): Promise<void> {
    const service = await ServicesService.createService(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'SERVICE_CREATED',
      resourceType: 'Service',
      resourceId: service.id,
      metadata: { title: service.title, slug: service.slug },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, service, 'Service created successfully');
  }

  public static async updateService(req: AuthRequest, res: Response): Promise<void> {
    const service = await ServicesService.updateService(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'SERVICE_UPDATED',
      resourceType: 'Service',
      resourceId: service.id,
      metadata: { title: service.title, isPublished: service.isPublished },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, service, 200, 'Service updated successfully');
  }

  public static async deleteService(req: AuthRequest, res: Response): Promise<void> {
    await ServicesService.deleteService(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'SERVICE_DELETED',
      resourceType: 'Service',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Service deleted successfully');
  }
}
