import { z } from 'zod';
import { LEAD_STATUS } from '../../config/constants.js';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email address is required'),
    phone: z.string().min(7, 'Valid phone number is required'),
    company: z.string().optional(),
    instagram: z.string().optional(),
    service: z.string().optional(),
    budgetRange: z.string().optional(),
    message: z.string().optional(),
  }),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Lead ID is required'),
  }),
  body: z.object({
    status: z
      .enum([
        LEAD_STATUS.NEW,
        LEAD_STATUS.CONTACTED,
        LEAD_STATUS.QUALIFIED,
        LEAD_STATUS.PROPOSAL_SENT,
        LEAD_STATUS.WON,
        LEAD_STATUS.LOST,
      ])
      .optional(),
    notes: z.string().optional(),
    service: z.string().optional(),
    budgetRange: z.string().optional(),
  }),
});
