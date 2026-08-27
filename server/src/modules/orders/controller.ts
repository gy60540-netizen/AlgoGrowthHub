import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { OrderService } from './service.js';
import { sendSuccess } from '../../utils/response.js';
import { OrderStatus } from '../../config/constants.js';
import { AuditLogService } from '../auditLogs/service.js';

export class OrderController {
  public static async getOrdersAdmin(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const status = req.query.status as OrderStatus;

    const result = await OrderService.getOrdersAdmin({ page, limit, status });
    sendSuccess(res, result.orders, 200, 'Orders retrieved successfully', result.pagination);
  }

  public static async getOrderById(req: AuthRequest, res: Response): Promise<void> {
    const order = await OrderService.getOrderById(req.params.id as string);
    sendSuccess(res, order, 200, 'Order retrieved successfully');
  }

  public static async refundOrder(req: AuthRequest, res: Response): Promise<void> {
    const order = await OrderService.refundOrder(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'ORDER_REFUNDED',
      resourceType: 'Order',
      resourceId: order.id,
      metadata: { amount: order.amount, userEmail: order.userEmail },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, order, 200, 'Order refunded successfully');
  }
}
