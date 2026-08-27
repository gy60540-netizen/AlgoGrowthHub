import { z } from 'zod';
import { CONTENT_STATUS } from '../../config/constants.js';

export const createExpertTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    image: z.string().min(1, 'Image URL or path is required'),
    role: z.string().min(2, 'Role / Designation is required'),
    instagramUrl: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    isFeatured: z.boolean().default(false),
    order: z.number().default(0),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .default(CONTENT_STATUS.PUBLISHED),
    isPublished: z.boolean().default(true),
  }),
});

export const updateExpertTeamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Team member ID is required'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    image: z.string().optional(),
    role: z.string().optional(),
    instagramUrl: z.string().url().optional().or(z.literal('')),
    linkedinUrl: z.string().url().optional().or(z.literal('')),
    isFeatured: z.boolean().optional(),
    order: z.number().optional(),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});
