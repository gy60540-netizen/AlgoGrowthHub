export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INVALID_FILE'
  | 'UPLOAD_ERROR'
  | 'STORAGE_ERROR'
  | 'DATABASE_ERROR'
  | 'PAYMENT_ERROR'
  | 'PAYMENT_VERIFICATION_FAILED'
  | 'RESOURCE_ACCESS_DENIED'
  | 'BOOKING_ERROR'
  | 'LEAD_ERROR'
  | 'INTERNAL_SERVER_ERROR';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly fields?: Record<string, string[]>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code: ErrorCode = 'INTERNAL_SERVER_ERROR',
    fields?: Record<string, string[]>,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
