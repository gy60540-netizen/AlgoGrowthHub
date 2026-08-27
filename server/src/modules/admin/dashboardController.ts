import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { Lead } from '../leads/model.js';
import { Booking } from '../bookings/model.js';
import { Creator } from '../creators/model.js';
import { ExpertTeamMember } from '../expertTeam/model.js';
import { Resource } from '../resources/model.js';
import { Order } from '../orders/model.js';
import { ClientResult } from '../clientResults/model.js';
import { sendSuccess } from '../../utils/response.js';
import { BOOKING_STATUS, LEAD_STATUS, ORDER_STATUS } from '../../config/constants.js';

export class AdminDashboardController {
  public static async getDashboardStats(_req: AuthRequest, res: Response): Promise<void> {
    const [
      totalLeads,
      newLeads,
      upcomingBookings,
      totalCreators,
      totalTeamMembers,
      publishedResources,
      paidOrders,
      totalClientResults,
      recentLeads,
      recentBookings,
      recentOrders,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: LEAD_STATUS.NEW }),
      Booking.countDocuments({ status: { $in: [BOOKING_STATUS.PENDING, BOOKING_STATUS.CONFIRMED] } }),
      Creator.countDocuments({ isPublished: true }),
      ExpertTeamMember.countDocuments({ isPublished: true }),
      Resource.countDocuments({ isPublished: true }),
      Order.find({ status: { $in: [ORDER_STATUS.PAID, ORDER_STATUS.FULFILLED] } }),
      ClientResult.countDocuments({ isPublished: true }),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
      Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
      Order.find().populate('resourceId', 'title price').sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalRevenue = paidOrders.reduce((sum, ord) => sum + (ord.amount || 0), 0);

    const stats = {
      summary: {
        totalLeads,
        newLeads,
        upcomingBookings,
        totalCreators,
        totalTeamMembers,
        publishedResources,
        totalPaidOrders: paidOrders.length,
        totalRevenue,
        totalClientResults,
      },
      recentActivity: {
        leads: recentLeads,
        bookings: recentBookings,
        orders: recentOrders,
      },
    };

    sendSuccess(res, stats, 200, 'Admin dashboard statistics fetched successfully');
  }
}
