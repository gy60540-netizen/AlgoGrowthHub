import { Order, IOrder } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { OrderStatus, ORDER_STATUS } from '../../config/constants.js';

export class OrderService {
  public static async getOrdersAdmin(query: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('resourceId', 'title slug price currency type')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  public static async getOrderById(id: string): Promise<IOrder> {
    const order = await Order.findById(id).populate('resourceId');
    if (!order) {
      throw new AppError('Order not found', 404, 'NOT_FOUND');
    }
    return order;
  }

  public static async refundOrder(id: string): Promise<IOrder> {
    const order = await Order.findById(id);
    if (!order) {
      throw new AppError('Order not found', 404, 'NOT_FOUND');
    }

    if (order.status !== ORDER_STATUS.PAID && order.status !== ORDER_STATUS.FULFILLED) {
      throw new AppError(`Cannot refund order in ${order.status} state`, 400, 'VALIDATION_ERROR');
    }

    order.status = ORDER_STATUS.REFUNDED;
    order.downloadToken = undefined;
    order.downloadExpiresAt = undefined;
    await order.save();
    return order;
  }
}
