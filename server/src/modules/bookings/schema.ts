import { z } from 'zod';
import { BOOKING_STATUS } from '../../config/constants.js';

export const createBookingSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email address is required'),
    phone: z.string().min(7, 'Valid phone / WhatsApp number is required'),
    company: z.string().optional(),
    service: z.string().min(2, 'Service selection is required'),
    preferredDate: z.string().min(1, 'Preferred date is required'),
    preferredTime: z.string().min(1, 'Preferred time is required'),
    timezone: z.string().default('IST (UTC+5:30)'),
    message: z.string().optional(),
  }),
});

export const updateBookingSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Booking ID is required'),
  }),
  body: z.object({
    status: z
      .enum([
        BOOKING_STATUS.PENDING,
        BOOKING_STATUS.CONFIRMED,
        BOOKING_STATUS.COMPLETED,
        BOOKING_STATUS.CANCELLED,
        BOOKING_STATUS.NO_SHOW,
      ])
      .optional(),
    notes: z.string().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
  }),
});
