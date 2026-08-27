import { z } from 'zod';
import { CONTENT_STATUS } from '../../config/constants.js';

export const createCreatorSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    profileImage: z.string().min(1, 'Profile image URL is required'),
    bio: z.string().min(5, 'Bio is required'),
    niche: z.string().min(2, 'Niche is required'),
    instagramUsername: z.string().min(1, 'Instagram username is required'),
    instagramUrl: z.string().url('Valid Instagram URL is required'),
    followerCount: z.string().min(1, 'Follower count is required (e.g. 150K+)'),
    isFeatured: z.boolean().default(false),
    order: z.number().default(0),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .default(CONTENT_STATUS.PUBLISHED),
    isPublished: z.boolean().default(true),
  }),
});

export const updateCreatorSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Creator ID is required'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    profileImage: z.string().optional(),
    bio: z.string().optional(),
    niche: z.string().optional(),
    instagramUsername: z.string().optional(),
    instagramUrl: z.string().url().optional(),
    followerCount: z.string().optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().optional(),
    status: z
      .enum([CONTENT_STATUS.DRAFT, CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.UNPUBLISHED, CONTENT_STATUS.ARCHIVED])
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});
