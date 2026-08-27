import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { AuthService } from './service.js';
import { sendSuccess } from '../../utils/response.js';
import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';
import { AuditLogService } from '../auditLogs/service.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.register({ name, email, password });

      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

      await AuditLogService.log({
        actorUserId: user._id?.toString(),
        actorEmail: user.email,
        action: 'USER_REGISTERED',
        resourceType: 'Auth',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] as string | undefined,
      });

      sendSuccess(res, { user, accessToken }, 201, 'User registered successfully');
    } catch (err) {
      next(err);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(email, password);

      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

      await AuditLogService.log({
        actorUserId: user._id?.toString(),
        actorEmail: user.email,
        action: 'USER_LOGGED_IN',
        resourceType: 'Auth',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] as string | undefined,
      });

      sendSuccess(res, { user, accessToken }, 200, 'Login successful');
    } catch (err) {
      next(err);
    }
  }

  public static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken;
      if (!token) {
        throw new AppError('Refresh token missing', 401, 'AUTHENTICATION_ERROR');
      }

      const { accessToken, refreshToken, user } = await AuthService.refreshToken(token);
      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

      sendSuccess(res, { user, accessToken }, 200, 'Token refreshed successfully');
    } catch (err) {
      next(err);
    }
  }

  public static async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.user) {
        await AuthService.logout(req.user.userId);
        await AuditLogService.log({
          actorUserId: req.user.userId,
          actorEmail: req.user.email,
          action: 'USER_LOGGED_OUT',
          resourceType: 'Auth',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] as string | undefined,
        });
      }

      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      sendSuccess(res, null, 200, 'Logged out successfully');
    } catch (err) {
      next(err);
    }
  }

  public static async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401, 'AUTHENTICATION_ERROR');
      }
      const user = await AuthService.getMe(req.user.userId);
      sendSuccess(res, user, 200, 'Current user profile fetched');
    } catch (err) {
      next(err);
    }
  }
}
