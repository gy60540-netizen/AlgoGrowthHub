import { z } from 'zod';
import { CONTENT_STATUS } from '../../config/constants.js';

export const createResourceSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title is required'),
    slug: z.string().optional(),
    description: z.string().default(''),
    thumbnail: z.string().min(1, 'Thumbnail image URL is required'),
    fileKey: z.string().min(1, 'File Key / path is required'),
    fileName: z.string().min(1, 'File Name is required'),
    fileSize: z.number().optional(),
    type: z.enum(['free', 'premium']).default('free'),
    fileFormat: z.enum(['pdf', 'zip', 'mp4']).default('pdf'),
    price: z.number().min(0).default(0),
    currency: z.string().default('INR'),
    isFeatured: z.boolean().default(false),
    order: z.number().default(0),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .default(CONTENT_STATUS.PUBLISHED),
    isPublished: z.boolean().default(true),
  }),
});

export const updateResourceSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resource ID is required'),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    fileKey: z.string().optional(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
    type: z.enum(['free', 'premium']).optional(),
    fileFormat: z.enum(['pdf', 'zip', 'mp4']).optional(),
    price: z.number().min(0).optional(),
    currency: z.string().optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().optional(),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});
