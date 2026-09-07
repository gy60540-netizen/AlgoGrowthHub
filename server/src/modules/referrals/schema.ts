import { z } from 'zod';

export const createPartnerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    initialCode: z
      .string()
      .min(2, 'Referral code must be at least 2 characters')
      .max(30, 'Referral code must be at most 30 characters')
      .regex(/^[A-Za-z0-9_-]+$/, 'Referral code must contain only letters, numbers, hyphens, or underscores')
      .optional(),
    resourceId: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const addPartnerResourceLinkSchema = z.object({
  body: z.object({
    code: z
      .string()
      .min(2, 'Referral code must be at least 2 characters')
      .max(30, 'Referral code must be at most 30 characters')
      .regex(/^[A-Za-z0-9_-]+$/, 'Referral code must contain only letters, numbers, hyphens, or underscores')
      .optional(),
    resourceId: z.string().optional(),
  }),
});

export const updatePartnerStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'DISABLED'], {
      errorMap: () => ({ message: "Status must be either 'ACTIVE' or 'DISABLED'" }),
    }),
  }),
});

export const trackReferralClickSchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Referral code is required'),
    landingPath: z.string().optional(),
    resourceId: z.string().optional(),
    visitorId: z.string().optional(),
    referrer: z.string().optional(),
  }),
});
