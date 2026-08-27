import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected server error occurred';
  let fields: Record<string, string[]> | undefined = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    fields = err.fields;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed for request parameters';
    fields = {};
    for (const issue of err.issues) {
      const fieldName = issue.path.join('.') || 'root';
      if (!fields[fieldName]) {
        fields[fieldName] = [];
      }
      fields[fieldName].push(issue.message);
    }
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    code = 'AUTHENTICATION_ERROR';
    message = 'Invalid authentication token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    code = 'AUTHENTICATION_ERROR';
    message = 'Authentication token has expired';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = `Invalid ID format for ${err.path}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    code = 'CONFLICT';
    const field = Object.keys(err.keyValue || {})[0] || 'resource';
    message = `A record with this ${field} already exists`;
  }

  if (env.NODE_ENV !== 'production' && statusCode === 500) {
    console.error('💥 Unhandled Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(fields ? { fields } : {}),
    },
  });
}
