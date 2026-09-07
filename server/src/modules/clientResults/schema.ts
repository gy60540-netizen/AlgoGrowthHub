import { z } from 'zod';
import { CONTENT_STATUS } from '../../config/constants.js';

export const createClientResultSchema = z.object({
  body: z.object({
    clientName: z.string().min(2, 'Client name is required'),
    description: z.string().optional(),
    instagramUrl: z.string().optional(),
    beforeImage: z.string().min(1, 'Before image URL is required'),
    afterImage: z.string().min(1, 'After image URL is required'),
    rating: z.number().min(1).max(5).default(5),
    isFeatured: z.boolean().default(false),
    order: z.number().default(0),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .default(CONTENT_STATUS.PUBLISHED),
    isPublished: z.boolean().default(true),
  }),
});

export const updateClientResultSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Client result ID is required'),
  }),
  body: z.object({
    clientName: z.string().min(2).optional(),
    description: z.string().optional(),
    instagramUrl: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().optional(),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});
