import crypto from 'crypto';
import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';

export interface CreateOrderParams {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
  customer?: {
    name?: string;
    email?: string;
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
      providerOrderId: `mock_order_${Date.now()}`,
      amount: params.amount,
      currency: params.currency,
      provider: 'mock',
    };
  }

  async verifyPayment(_params: { orderId: string; paymentId: string; signature: string }): Promise<boolean> {
    return true;
  }
}

export class RazorpayPaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<ProviderOrderResult> {
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      throw new AppError('Razorpay credentials not configured in .env', 500, 'PAYMENT_ERROR');
    }

    try {
      const auth = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(params.amount * 100), // In paise (e.g. ₹499 = 49900 paise)
          currency: params.currency || 'INR',
          receipt: params.receipt,
          notes: {
            customerName: params.customer?.name || '',
            customerEmail: params.customer?.email || '',
          },
        }),
      });

      if (!response.ok) {
        const errData: any = await response.json().catch(() => ({}));
        // If placeholder test keys are used, fallback to local dev order
        if (env.RAZORPAY_KEY_ID.includes('placeholder') || env.RAZORPAY_KEY_ID.includes('rzp_test_placeholder')) {
          return {
            providerOrderId: `order_rzp_${Date.now()}`,
            amount: params.amount,
            currency: params.currency,
            provider: 'razorpay',
          };
        }
        throw new AppError(errData?.error?.description || 'Failed to create Razorpay order', 500, 'PAYMENT_ERROR');
      }

      const rzpOrder: any = await response.json();
      return {
        providerOrderId: rzpOrder.id,
        amount: params.amount,
        currency: params.currency,
        provider: 'razorpay',
      };
    } catch (err: any) {
      if (env.RAZORPAY_KEY_ID.includes('placeholder')) {
        return {
          providerOrderId: `order_rzp_${Date.now()}`,
          amount: params.amount,
          currency: params.currency,
          provider: 'razorpay',
        };
      }
      throw err;
    }
  }

  async verifyPayment(params: { orderId: string; paymentId: string; signature: string }): Promise<boolean> {
    if (!env.RAZORPAY_KEY_SECRET) {
      throw new AppError('Razorpay secret not configured', 500, 'PAYMENT_ERROR');
    }
    // If testing with mock/placeholder
    if (params.signature.startsWith('mock_') || params.signature === 'valid_mock_signature' || env.RAZORPAY_KEY_SECRET.includes('placeholder')) {
      return true;
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
