import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { SiteSettingsService } from './service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class SiteSettingsController {
  public static async getSettings(_req: Request, res: Response): Promise<void> {
    const settings = await SiteSettingsService.getSettings();
    sendSuccess(res, settings, 200, 'Site settings retrieved successfully');
  }

  public static async updateSettings(req: AuthRequest, res: Response): Promise<void> {
    const settings = await SiteSettingsService.updateSettings(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'SITE_SETTINGS_UPDATED',
      resourceType: 'SiteSettings',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, settings, 200, 'Site settings updated successfully');
  }
}
