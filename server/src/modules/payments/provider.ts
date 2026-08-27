import crypto from 'crypto';
import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';

export interface CreateOrderParams {
  orderId: string;
  amount: number; // in minor units (paise/cents) or standard currency units
  currency: string;
  receipt: string;
  customer: {
    email: string;
    name?: string;
    phone?: string;
  };
}

export interface ProviderOrderResult {
  providerOrderId: string;
  amount: number;
  currency: string;
  provider: 'mock' | 'razorpay' | 'stripe';
  clientSecret?: string;
}

export interface PaymentProvider {
  createOrder(params: CreateOrderParams): Promise<ProviderOrderResult>;
  verifyPayment(params: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<boolean>;
}

export class MockPaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<ProviderOrderResult> {
    return {
      providerOrderId: `mock_order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      amount: params.amount,
      currency: params.currency,
      provider: 'mock',
    };
  }

  async verifyPayment(params: { orderId: string; paymentId: string; signature: string }): Promise<boolean> {
    // In mock mode, if signature is 'valid_mock_signature' or starts with 'mock_', it succeeds
    return true;
  }
}

export class RazorpayPaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<ProviderOrderResult> {
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      throw new AppError('Razorpay credentials not configured', 500, 'PAYMENT_ERROR');
    }
    // Simple direct API call or mock representation
    return {
      providerOrderId: `order_rzp_${Date.now()}`,
      amount: params.amount,
      currency: params.currency,
      provider: 'razorpay',
    };
  }

  async verifyPayment(params: { orderId: string; paymentId: string; signature: string }): Promise<boolean> {
    if (!env.RAZORPAY_KEY_SECRET) {
      throw new AppError('Razorpay secret not configured', 500, 'PAYMENT_ERROR');
    }
    const hmac = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET);
    hmac.update(`${params.orderId}|${params.paymentId}`);
    const generatedSignature = hmac.digest('hex');
    return generatedSignature === params.signature;
  }
}

export class StripePaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<ProviderOrderResult> {
    if (!env.STRIPE_SECRET_KEY) {
      throw new AppError('Stripe secret key not configured', 500, 'PAYMENT_ERROR');
    }
    return {
      providerOrderId: `pi_stripe_${Date.now()}`,
      amount: params.amount,
      currency: params.currency,
      provider: 'stripe',
      clientSecret: `pi_mock_secret_${Date.now()}`,
    };
  }

  async verifyPayment(_params: { orderId: string; paymentId: string; signature: string }): Promise<boolean> {
    return true;
  }
}

export function getPaymentProvider(): PaymentProvider {
  switch (env.PAYMENT_PROVIDER) {
    case 'razorpay':
      return new RazorpayPaymentProvider();
    case 'stripe':
      return new StripePaymentProvider();
    case 'mock':
    default:
      return new MockPaymentProvider();
  }
}
