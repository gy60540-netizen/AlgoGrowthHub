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

export const bookingCheckoutSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email address is required'),
    phone: z.string().min(7, 'Phone number is required'),
    company: z.string().optional(),
    service: z.string().min(2, 'Service selection is required'),
    preferredDate: z.string().min(1, 'Preferred date is required'),
    preferredTime: z.string().min(1, 'Preferred time is required'),
    timezone: z.string().default('IST (UTC+5:30)'),
    message: z.string().optional(),
    amount: z.number().default(999),
  }),
});

export const verifyBookingPaymentSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, 'Booking ID is required'),
    paymentId: z.string().min(1, 'Payment ID is required'),
    signature: z.string().min(1, 'Signature is required'),
  }),
});
