import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { ReferralService } from './service.js';
import { sendSuccess } from '../../utils/response.js';

export class ReferralController {
  // Admin Endpoints
  public static async createPartner(req: AuthRequest, res: Response): Promise<void> {
    const adminUserId = req.user?.userId || '';
    const partner = await ReferralService.createPartner(adminUserId, req.body);
    sendSuccess(res, partner, 201, 'Partner created successfully with referral link');
  }

  public static async getAllPartners(_req: AuthRequest, res: Response): Promise<void> {
    const result = await ReferralService.getAllPartners();
    sendSuccess(res, result, 200, 'Partners retrieved successfully');
  }

  public static async getPartnerById(req: AuthRequest, res: Response): Promise<void> {
    const partnerId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const partner = await ReferralService.getPartnerById(partnerId);
    sendSuccess(res, partner, 200, 'Partner details retrieved successfully');
  }

  public static async addResourceLink(req: AuthRequest, res: Response): Promise<void> {
    const partnerId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const partner = await ReferralService.addPartnerResourceLink(partnerId, req.body);
    sendSuccess(res, partner, 200, 'Resource referral link added successfully');
  }

  public static async toggleStatus(req: AuthRequest, res: Response): Promise<void> {
    const partnerId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const partner = await ReferralService.togglePartnerStatus(partnerId, req.body.status);
    sendSuccess(res, partner, 200, `Partner status updated to ${req.body.status}`);
  }

  // Partner Self Endpoints (Strictly scoped to req.user.userId)
  public static async getPartnerDashboard(req: AuthRequest, res: Response): Promise<void> {
    const partnerUserId = req.user?.userId || '';
    const dashboard = await ReferralService.getPartnerSelfDashboard(partnerUserId);
    sendSuccess(res, dashboard, 200, 'Partner dashboard metrics retrieved successfully');
  }

  public static async getPartnerLeads(req: AuthRequest, res: Response): Promise<void> {
    const partnerUserId = req.user?.userId || '';
    const leads = await ReferralService.getPartnerSelfLeads(partnerUserId);
    sendSuccess(res, leads, 200, 'Partner attributed leads retrieved successfully');
  }

  // Public Tracking Endpoint
  public static async trackClick(req: AuthRequest, res: Response): Promise<void> {
    const result = await ReferralService.trackClick({
      code: req.body.code,
      landingPath: req.body.landingPath,
      resourceId: req.body.resourceId,
      visitorId: req.body.visitorId,
      referrer: req.body.referrer,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    sendSuccess(res, result, 200, 'Click recorded');
  }
}
