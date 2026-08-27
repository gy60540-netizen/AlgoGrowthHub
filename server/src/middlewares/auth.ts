import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
import { Role, Permission, ROLE_PERMISSIONS } from '../config/constants.js';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function requireAuth(req: AuthRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new AppError(
        'Authentication required. Please provide a valid Bearer token.',
        401,
        'AUTHENTICATION_ERROR'
      )
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(
        new AppError('Access token has expired. Please refresh your session.', 401, 'AUTHENTICATION_ERROR')
      );
    }
    return next(new AppError('Invalid access token.', 401, 'AUTHENTICATION_ERROR'));
  }
}

export function requireRole(allowedRoles: Role[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Unauthorized. User not authenticated.', 401, 'AUTHENTICATION_ERROR'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          'Forbidden. You do not have sufficient role privileges.',
          403,
          'AUTHORIZATION_ERROR'
        )
      );
    }

    next();
  };
}

export function requirePermission(permission: Permission) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Unauthorized. User not authenticated.', 401, 'AUTHENTICATION_ERROR'));
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];

    if (!userPermissions.includes(permission)) {
      return next(
        new AppError(
          `Forbidden. You lack the required permission: ${permission}`,
          403,
          'AUTHORIZATION_ERROR'
        )
      );
    }

    next();
  };
}
