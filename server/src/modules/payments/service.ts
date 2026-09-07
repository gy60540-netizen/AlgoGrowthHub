import crypto from 'crypto';
import { Resource } from '../resources/model.js';
import { Order, IOrder } from '../orders/model.js';
import { Booking } from '../bookings/model.js';
import { ReferralPartner } from '../referrals/model.js';
import { ReferralService } from '../referrals/service.js';
import { getPaymentProvider } from './provider.js';
import { AppError } from '../../utils/AppError.js';
import { ORDER_STATUS, BOOKING_STATUS } from '../../config/constants.js';

import { env } from '../../config/env.js';

export class PaymentService {
  public static async initiateCheckout(data: {
    resourceId: string;
    userEmail: string;
    userName?: string;
    userPhone?: string;
    referralCode?: string;
  }): Promise<{
    orderId: string;
    providerOrderId: string;
    amount: number;
    currency: string;
    provider: string;
    keyId?: string;
    clientSecret?: string;
  }> {
    const resource = await Resource.findById(data.resourceId);
    if (!resource || !resource.isPublished) {
      throw new AppError('Resource not found or unavailable', 404, 'NOT_FOUND');
    }

    if (resource.type === 'free') {
      throw new AppError('Free resources do not require payment checkout', 400, 'VALIDATION_ERROR');
    }

    // Check referral partner attribution if referralCode provided
    let partnerId: any = undefined;
    let refCode: string | undefined = undefined;

    if (data.referralCode) {
      refCode = data.referralCode.toUpperCase().trim();
      const partner = await ReferralPartner.findOne({ 'links.code': refCode, status: 'ACTIVE' });
      if (partner) {
        partnerId = partner.userId;
      }
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
      partnerId,
      referralCode: refCode,
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
      keyId: env.RAZORPAY_KEY_ID || '',
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

    // Increment partner sales count and revenue if referral attributed
    if (order.referralCode) {
      await ReferralService.attributeVerifiedOrder(order.referralCode, order.amount).catch(() => {});
    }

    // Increment resource download/purchase count
    await Resource.findByIdAndUpdate(order.resourceId, { $inc: { downloadCount: 1 } });

    return {
      order,
      downloadToken,
      downloadUrl: `/api/v1/resources/${order.resourceId}/download?token=${downloadToken}`,
    };
  }

  public static async initiateBookingCheckout(data: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
    timezone?: string;
    message?: string;
    amount?: number;
    referralCode?: string;
  }): Promise<{
    bookingId: string;
    orderId: string;
    providerOrderId: string;
    amount: number;
    currency: string;
    provider: string;
    keyId: string;
  }> {
    const bookingAmount = data.amount || 999;

    let partnerId: any = undefined;
    let refCode: string | undefined = undefined;

    if (data.referralCode) {
      refCode = data.referralCode.toUpperCase().trim();
      const partner = await ReferralPartner.findOne({ 'links.code': refCode, status: 'ACTIVE' });
      if (partner) {
        partnerId = partner.userId;
      }
    }

    // Create Booking record in PENDING payment status
    const booking = await Booking.create({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      company: data.company,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      timezone: data.timezone || 'IST (UTC+5:30)',
      message: data.message,
      amount: bookingAmount,
      currency: 'INR',
      status: BOOKING_STATUS.PENDING,
      paymentStatus: 'PENDING',
      partnerId,
      referralCode: refCode,
    });

    const provider = getPaymentProvider();
    const providerResult = await provider.createOrder({
      orderId: booking.id,
      amount: bookingAmount,
      currency: 'INR',
      receipt: `rcpt_bk_${booking.id.slice(-8)}`,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });

    booking.provider = providerResult.provider;
    booking.providerOrderId = providerResult.providerOrderId;
    await booking.save();

    return {
      bookingId: booking.id,
      orderId: booking.id,
      providerOrderId: providerResult.providerOrderId,
      amount: booking.amount,
      currency: booking.currency,
      provider: booking.provider,
      keyId: env.RAZORPAY_KEY_ID || '',
    };
  }

  public static async verifyBookingPayment(data: {
    bookingId: string;
    paymentId: string;
    signature: string;
  }): Promise<{
    booking: any;
  }> {
    const booking = await Booking.findById(data.bookingId);
    if (!booking) {
      throw new AppError('Booking not found', 404, 'NOT_FOUND');
    }

    if (booking.paymentStatus === 'PAID') {
      return { booking };
    }

    const provider = getPaymentProvider();
    const isValid = await provider.verifyPayment({
      orderId: booking.providerOrderId || booking.id,
      paymentId: data.paymentId,
      signature: data.signature,
    });

    if (!isValid) {
      booking.paymentStatus = 'FAILED';
      await booking.save();
      throw new AppError('Payment signature verification failed', 400, 'PAYMENT_VERIFICATION_FAILED');
    }

    booking.providerPaymentId = data.paymentId;
    booking.providerSignature = data.signature;
    booking.paymentStatus = 'PAID';
    booking.status = BOOKING_STATUS.CONFIRMED;
    await booking.save();

    // Create Order record so the transaction reflects in Orders & Revenue Stream
    try {
      await Order.create({
        userEmail: booking.email,
        userName: booking.name,
        userPhone: booking.phone,
        bookingId: booking._id,
        partnerId: booking.partnerId,
        referralCode: booking.referralCode,
        orderType: 'STRATEGY_BOOKING',
        amount: booking.amount,
        currency: booking.currency,
        provider: booking.provider || 'razorpay',
        providerOrderId: booking.providerOrderId,
        providerPaymentId: data.paymentId,
        providerSignature: data.signature,
        status: ORDER_STATUS.PAID,
        metadata: {
          service: booking.service,
          preferredDate: booking.preferredDate,
          preferredTime: booking.preferredTime,
          type: '1-on-1 Growth Consultation Session',
        },
      });

      if (booking.referralCode) {
        await ReferralService.attributeVerifiedOrder(booking.referralCode, booking.amount).catch(() => {});
      }
    } catch (orderErr) {
      console.warn('Warning creating order record for booking:', orderErr);
    }

    return { booking };
  }
}
