import { z } from 'zod';
import { CONTENT_STATUS } from '../../config/constants.js';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title is required'),
    slug: z.string().optional(),
    shortDescription: z.string().min(5, 'Short description is required'),
    longDescription: z.string().optional(),
    image: z.string().min(1, 'Image URL or path is required'),
    features: z.array(z.string()).default([]),
    ctaLabel: z.string().default('Read More →'),
    status: z.enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED]).default(CONTENT_STATUS.PUBLISHED),
    isPublished: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Service ID is required'),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    slug: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    image: z.string().optional(),
    features: z.array(z.string()).optional(),
    ctaLabel: z.string().optional(),
    status: z.enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED]).optional(),
    isPublished: z.boolean().optional(),
    order: z.number().optional(),
  }),
});
