import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: Record<string, any>;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string,
  meta?: Record<string, any>
): void {
  const body: ApiResponse<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
    ...(meta ? { meta } : {}),
  };
  res.status(statusCode).json(body);
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message = 'Resource created successfully'
): void {
  sendSuccess(res, data, 201, message);
}
