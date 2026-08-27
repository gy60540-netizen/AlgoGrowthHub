import crypto from 'crypto';
import { Resource } from '../resources/model.js';
import { Order, IOrder } from '../orders/model.js';
import { getPaymentProvider } from './provider.js';
import { AppError } from '../../utils/AppError.js';
import { ORDER_STATUS } from '../../config/constants.js';

export class PaymentService {
  public static async initiateCheckout(data: {
    resourceId: string;
    userEmail: string;
    userName?: string;
    userPhone?: string;
  }): Promise<{
    orderId: string;
    providerOrderId: string;
    amount: number;
    currency: string;
    provider: string;
    clientSecret?: string;
  }> {
    const resource = await Resource.findById(data.resourceId);
    if (!resource || !resource.isPublished) {
      throw new AppError('Resource not found or unavailable', 404, 'NOT_FOUND');
    }

    if (resource.type === 'free') {
      throw new AppError('Free resources do not require payment checkout', 400, 'VALIDATION_ERROR');
    }

    // Create DB Order in CREATED status
    const order = await Order.create({
      userEmail: data.userEmail.toLowerCase(),
      userName: data.userName,
      userPhone: data.userPhone,
      resourceId: resource.id,
      amount: resource.price,
      currency: resource.currency,
      status: ORDER_STATUS.CREATED,
    });

    const provider = getPaymentProvider();
    const providerResult = await provider.createOrder({
      orderId: order.id,
      amount: resource.price,
      currency: resource.currency,
      receipt: `rcpt_${order.id}`,
      customer: {
        email: data.userEmail,
        name: data.userName,
        phone: data.userPhone,
      },
    });

    order.provider = providerResult.provider;
    order.providerOrderId = providerResult.providerOrderId;
    order.status = ORDER_STATUS.PENDING;
    await order.save();

    return {
      orderId: order.id,
      providerOrderId: providerResult.providerOrderId,
      amount: order.amount,
      currency: order.currency,
      provider: order.provider,
      clientSecret: providerResult.clientSecret,
    };
  }

  public static async verifyPayment(data: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<{
    order: IOrder;
    downloadToken: string;
    downloadUrl: string;
  }> {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new AppError('Order not found', 404, 'NOT_FOUND');
    }

    if (order.status === ORDER_STATUS.PAID || order.status === ORDER_STATUS.FULFILLED) {
      // Idempotency: Return existing valid download access
      return {
        order,
        downloadToken: order.downloadToken || '',
        downloadUrl: `/api/v1/resources/${order.resourceId}/download?token=${order.downloadToken}`,
      };
    }

    const provider = getPaymentProvider();
    const isValid = await provider.verifyPayment({
      orderId: order.providerOrderId || order.id,
      paymentId: data.paymentId,
      signature: data.signature,
    });

    if (!isValid) {
      order.status = ORDER_STATUS.FAILED;
      await order.save();
      throw new AppError('Payment signature verification failed', 400, 'PAYMENT_VERIFICATION_FAILED');
    }

    // Generate secure single-use download token valid for 48 hours
    const downloadToken = crypto.randomBytes(32).toString('hex');
    const downloadExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    order.providerPaymentId = data.paymentId;
    order.providerSignature = data.signature;
    order.status = ORDER_STATUS.PAID;
    order.downloadToken = downloadToken;
    order.downloadExpiresAt = downloadExpiresAt;
    await order.save();

    // Increment resource download/purchase count
    await Resource.findByIdAndUpdate(order.resourceId, { $inc: { downloadCount: 1 } });

    return {
      order,
      downloadToken,
      downloadUrl: `/api/v1/resources/${order.resourceId}/download?token=${downloadToken}`,
    };
  }
}
