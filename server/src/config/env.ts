import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URI: z.string().default('mongodb://localhost:27017/algogrowthhub'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  JWT_ACCESS_SECRET: z.string().default('algogrowthhub_super_secret_access_jwt_key_2026'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().default('algogrowthhub_super_secret_refresh_jwt_key_2026'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  SUPER_ADMIN_NAME: z.string().default('Super Admin'),
  SUPER_ADMIN_EMAIL: z.string().email().default('admin@algogrowthhub.com'),
  SUPER_ADMIN_PASSWORD: z.string().default('Admin@123456'),

  PAYMENT_PROVIDER: z.enum(['mock', 'razorpay', 'stripe']).default('mock'),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  STORAGE_PROVIDER: z.enum(['local', 'cloudinary']).default('local'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
