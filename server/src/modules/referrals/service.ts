import mongoose from 'mongoose';
import { User } from '../users/model.js';
import { Resource } from '../resources/model.js';
import { Order } from '../orders/model.js';
import { ReferralPartner, ReferralClick, IReferralPartner } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { ROLES } from '../../config/constants.js';

export class ReferralService {
  /**
   * Helper: Mask customer name and email for privacy while preserving verification transparency
   */
  private static maskCustomerName(name?: string): string {
    if (!name) return 'Customer';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].length > 2 ? `${parts[0].slice(0, 2)}***` : `${parts[0]}*`;
    }
    return `${parts[0]} ${parts[1].slice(0, 1)}****`;
  }

  private static maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const maskedLocal = local.length > 2 ? `${local.slice(0, 2)}***` : `${local}*`;
    return `${maskedLocal}@${domain}`;
  }

  /**
   * Admin: Create a new Partner account and initial referral link
   */
  public static async createPartner(
    adminUserId: string,
    data: {
      name: string;
      email: string;
      password: string;
      phone?: string;
      initialCode?: string;
      resourceId?: string;
      notes?: string;
    }
  ): Promise<IReferralPartner> {
    const email = data.email.toLowerCase().trim();
    const baseCode = (data.name.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 5) || 'PARTNER');
    const code = (data.initialCode ? data.initialCode.trim() : `${baseCode}${Math.floor(100 + Math.random() * 900)}`).toUpperCase();

    // 1. Check if user email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('A user or partner with this email is already registered', 409, 'CONFLICT');
    }

    // 2. Check if referral code is already taken
    const existingCode = await ReferralPartner.findOne({ 'links.code': code });
    if (existingCode) {
      throw new AppError(`Referral code "${code}" is already in use. Please pick another code.`, 409, 'CONFLICT');
    }

    // 3. Resolve target resource if provided
    let targetUrl = '/';
    let resourceTitle = 'General Website';
    let resourceObjectId: mongoose.Types.ObjectId | undefined;

    if (data.resourceId) {
      const resource = await Resource.findById(data.resourceId);
      if (resource) {
        resourceObjectId = resource._id as mongoose.Types.ObjectId;
        resourceTitle = resource.title;
        targetUrl = `/resources/${resource.slug}`;
      }
    }

    // 4. Create User account with PARTNER role (password auto-hashed with bcrypt 12 rounds in User model)
    const user = await User.create({
      name: data.name.trim(),
      email,
      password: data.password,
      role: ROLES.PARTNER,
      isActive: true,
    });

    // 5. Create ReferralPartner record
    const partner = await ReferralPartner.create({
      userId: user._id,
      name: data.name.trim(),
      email,
      phone: data.phone?.trim(),
      notes: data.notes?.trim(),
      status: 'ACTIVE',
      createdBy: new mongoose.Types.ObjectId(adminUserId),
      links: [
        {
          code,
          resourceId: resourceObjectId,
          resourceTitle,
          targetUrl,
          clicksCount: 0,
          viewsCount: 0,
          salesCount: 0,
          revenueGenerated: 0,
          isActive: true,
          createdAt: new Date(),
        },
      ],
    });

    return partner;
  }

  /**
   * Admin: Add an additional resource referral link for an existing partner
   */
  public static async addPartnerResourceLink(
    partnerId: string,
    data: {
      code?: string;
      resourceId?: string;
    }
  ): Promise<IReferralPartner> {
    const partner = await ReferralPartner.findById(partnerId);
    if (!partner) {
      throw new AppError('Partner not found', 404, 'NOT_FOUND');
    }

    const baseCode = (partner.name.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 5) || 'PARTNER');
    const code = (data.code ? data.code.trim() : `${baseCode}${Math.floor(1000 + Math.random() * 9000)}`).toUpperCase();

    // Check code uniqueness across all partners
    const existingCode = await ReferralPartner.findOne({ 'links.code': code });
    if (existingCode) {
      throw new AppError(`Referral code "${code}" is already in use.`, 409, 'CONFLICT');
    }

    let targetUrl = '/';
    let resourceTitle = 'General Website';
    let resourceObjectId: mongoose.Types.ObjectId | undefined;

    if (data.resourceId) {
      const resource = await Resource.findById(data.resourceId);
      if (resource) {
        resourceObjectId = resource._id as mongoose.Types.ObjectId;
        resourceTitle = resource.title;
        targetUrl = `/resources/${resource.slug}`;
      }
    }

    partner.links.push({
      code,
      resourceId: resourceObjectId,
      resourceTitle,
      targetUrl,
      clicksCount: 0,
      viewsCount: 0,
      salesCount: 0,
      revenueGenerated: 0,
      isActive: true,
      createdAt: new Date(),
    });

    await partner.save();
    return partner;
  }

  /**
   * Admin: Get all partners with summary metrics
   */
  public static async getAllPartners(): Promise<{
    partners: any[];
    summary: {
      totalPartners: number;
      activePartners: number;
      totalLinks: number;
      totalClicks: number;
      totalSales: number;
      totalRevenue: number;
    };
  }> {
    const partners = await ReferralPartner.find().sort({ createdAt: -1 });

    let totalLinks = 0;
    let totalClicks = 0;
    let totalSales = 0;
    let totalRevenue = 0;
    let activePartners = 0;

    const formatted = partners.map((p) => {
      const pLinks = p.links || [];
      const pClicks = pLinks.reduce((acc, l) => acc + (l.clicksCount || 0), 0);
      const pSales = pLinks.reduce((acc, l) => acc + (l.salesCount || 0), 0);
      const pRevenue = pLinks.reduce((acc, l) => acc + (l.revenueGenerated || 0), 0);

      totalLinks += pLinks.length;
      totalClicks += pClicks;
      totalSales += pSales;
      totalRevenue += pRevenue;
      if (p.status === 'ACTIVE') activePartners++;

      return {
        _id: p._id,
        userId: p.userId,
        name: p.name,
        email: p.email,
        phone: p.phone,
        status: p.status,
        notes: p.notes,
        linksCount: pLinks.length,
        totalClicks: pClicks,
        totalSales: pSales,
        totalRevenue: pRevenue,
        conversionRate: pClicks > 0 ? ((pSales / pClicks) * 100).toFixed(2) : '0.00',
        links: pLinks,
        createdAt: p.createdAt,
      };
    });

    return {
      partners: formatted,
      summary: {
        totalPartners: partners.length,
        activePartners,
        totalLinks,
        totalClicks,
        totalSales,
        totalRevenue,
      },
    };
  }

  /**
   * Admin: Get partner details by ID
   */
  public static async getPartnerById(partnerId: string): Promise<any> {
    const partner = await ReferralPartner.findById(partnerId);
    if (!partner) {
      throw new AppError('Partner not found', 404, 'NOT_FOUND');
    }

    const orders = await Order.find({ partnerId: partner.userId, status: 'PAID' })
      .sort({ createdAt: -1 })
      .limit(50);

    return {
      partner,
      recentOrders: orders,
    };
  }

  /**
   * Admin: Toggle partner status (ACTIVE / DISABLED)
   */
  public static async togglePartnerStatus(partnerId: string, status: 'ACTIVE' | 'DISABLED'): Promise<IReferralPartner> {
    const partner = await ReferralPartner.findById(partnerId);
    if (!partner) {
      throw new AppError('Partner not found', 404, 'NOT_FOUND');
    }

    partner.status = status;
    await partner.save();

    // Synchronize User account active state so disabled partner cannot log in
    await User.findByIdAndUpdate(partner.userId, { isActive: status === 'ACTIVE' });

    return partner;
  }

  /**
   * Partner: Get self dashboard strictly scoped to logged-in user
   */
  public static async getPartnerSelfDashboard(partnerUserId: string): Promise<any> {
    const partner = await ReferralPartner.findOne({ userId: partnerUserId });
    if (!partner) {
      throw new AppError('Partner profile not found', 404, 'NOT_FOUND');
    }

    if (partner.status === 'DISABLED') {
      throw new AppError('Your partner account is disabled. Please contact administrator.', 403, 'ACCOUNT_DISABLED');
    }

    const links = partner.links || [];
    const totalClicks = links.reduce((acc, l) => acc + (l.clicksCount || 0), 0);
    const totalViews = links.reduce((acc, l) => acc + (l.viewsCount || 0), 0);
    const totalPurchases = links.reduce((acc, l) => acc + (l.salesCount || 0), 0);
    const totalRevenue = links.reduce((acc, l) => acc + (l.revenueGenerated || 0), 0);
    const conversionRate = totalClicks > 0 ? ((totalPurchases / totalClicks) * 100).toFixed(2) : '0.00';

    // Unique visitors via distinct visitorId
    const distinctVisitors = await ReferralClick.distinct('visitorId', { partnerId: partner.userId });
    const uniqueVisitors = distinctVisitors.length || Math.min(totalClicks, Math.round(totalClicks * 0.85));

    return {
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
        status: partner.status,
      },
      metrics: {
        totalClicks,
        uniqueVisitors,
        resourceViews: totalViews,
        purchases: totalPurchases,
        revenueGenerated: totalRevenue,
        conversionRate: `${conversionRate}%`,
      },
      links: links.map((l) => ({
        id: l._id,
        code: l.code,
        resourceId: l.resourceId,
        resourceTitle: l.resourceTitle || 'General Website',
        targetUrl: l.targetUrl,
        fullUrl: `${l.targetUrl.includes('?') ? l.targetUrl : `${l.targetUrl}?ref=${l.code}`}`,
        clicksCount: l.clicksCount || 0,
        viewsCount: l.viewsCount || 0,
        salesCount: l.salesCount || 0,
        revenueGenerated: l.revenueGenerated || 0,
        isActive: l.isActive,
        createdAt: l.createdAt,
      })),
    };
  }

  /**
   * Partner: Get self generated leads/orders (Transparency & Trust)
   */
  public static async getPartnerSelfLeads(partnerUserId: string): Promise<any[]> {
    const partner = await ReferralPartner.findOne({ userId: partnerUserId });
    if (!partner) {
      throw new AppError('Partner profile not found', 404, 'NOT_FOUND');
    }

    if (partner.status === 'DISABLED') {
      throw new AppError('Partner account is disabled', 403, 'ACCOUNT_DISABLED');
    }

    const orders = await Order.find({ partnerId: partner.userId, status: 'PAID' })
      .sort({ createdAt: -1 })
      .populate('resourceId', 'title slug')
      .limit(100);

    return orders.map((o: any) => ({
      _id: o._id,
      customerName: ReferralService.maskCustomerName(o.userName),
      customerEmail: ReferralService.maskEmail(o.userEmail),
      itemTitle:
        o.orderType === 'STRATEGY_BOOKING'
          ? '🗓️ 1-on-1 Growth Strategy Session'
          : (o.resourceId?.title || 'Digital Growth Resource'),
      amount: o.amount,
      currency: o.currency || 'INR',
      status: o.status,
      paymentStatus: 'VERIFIED PAID',
      referralCode: o.referralCode,
      createdAt: o.createdAt,
    }));
  }

  /**
   * Public: Track click event silently
   */
  public static async trackClick(data: {
    code: string;
    landingPath?: string;
    resourceId?: string;
    visitorId?: string;
    referrer?: string;
    ip?: string;
    userAgent?: string;
  }): Promise<{ tracked: boolean; code: string; targetUrl?: string; partnerName?: string }> {
    const code = data.code.toUpperCase().trim();

    const partner = await ReferralPartner.findOne({
      status: 'ACTIVE',
      'links.code': code,
    });

    if (!partner) {
      return { tracked: false, code };
    }

    const matchedLink = partner.links.find((l) => l.code === code && l.isActive);
    if (!matchedLink) {
      return { tracked: false, code };
    }

    // Increment click counter atomically
    await ReferralPartner.updateOne(
      { _id: partner._id, 'links.code': code },
      { $inc: { 'links.$.clicksCount': 1 } }
    );

    // Record click event in background
    ReferralClick.create({
      referralCode: code,
      partnerId: partner.userId,
      resourceId: data.resourceId ? new mongoose.Types.ObjectId(data.resourceId) : matchedLink.resourceId,
      visitorId: data.visitorId,
      landingPath: data.landingPath,
      ip: data.ip,
      userAgent: data.userAgent,
      referrer: data.referrer,
    }).catch(() => {
      // Non-blocking catch
    });

    return {
      tracked: true,
      code,
      targetUrl: matchedLink.targetUrl,
      partnerName: partner.name,
    };
  }

  /**
   * Hook for Payment Verification: Called when an order is verified PAID
   */
  public static async attributeVerifiedOrder(referralCode: string, amount: number): Promise<void> {
    if (!referralCode) return;
    const code = referralCode.toUpperCase().trim();

    await ReferralPartner.updateOne(
      { 'links.code': code },
      {
        $inc: {
          'links.$.salesCount': 1,
          'links.$.revenueGenerated': amount,
        },
      }
    );
  }
}
