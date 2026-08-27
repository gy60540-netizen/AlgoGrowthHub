import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  skip: () => env.NODE_ENV === 'test',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new AppError('Too many requests, please try again after 15 minutes', 429, 'RATE_LIMITED')
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skip: () => env.NODE_ENV === 'test',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new AppError('Too many login attempts. Please try again later.', 429, 'RATE_LIMITED')
    );
  },
});
