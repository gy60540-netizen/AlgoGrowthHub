import { z } from 'zod';
import { ROLES } from '../../config/constants.js';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]).default(ROLES.USER),
    isActive: z.boolean().default(true),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]).optional(),
    isActive: z.boolean().optional(),
  }),
});
