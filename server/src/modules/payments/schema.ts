import { z } from 'zod';

export const checkoutSchema = z.object({
  body: z.object({
    resourceId: z.string().min(1, 'Resource ID is required'),
    userEmail: z.string().email('Valid email address is required'),
    userName: z.string().optional(),
    userPhone: z.string().optional(),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, 'Order ID is required'),
    paymentId: z.string().min(1, 'Payment ID is required'),
    signature: z.string().min(1, 'Signature is required'),
  }),
});
