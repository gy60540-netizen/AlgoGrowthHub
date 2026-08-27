import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { UserService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class UserController {
  public static async getUsers(_req: AuthRequest, res: Response): Promise<void> {
    const users = await UserService.getAllUsers();
    sendSuccess(res, users, 200, 'Users retrieved successfully');
  }

  public static async getUserById(req: AuthRequest, res: Response): Promise<void> {
    const user = await UserService.getUserById(req.params.id as string);
    sendSuccess(res, user, 200, 'User retrieved successfully');
  }

  public static async createUser(req: AuthRequest, res: Response): Promise<void> {
    const user = await UserService.createUser(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'USER_CREATED',
      resourceType: 'User',
      resourceId: user.id,
      metadata: { email: user.email, role: user.role },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, user, 'User created successfully');
  }

  public static async updateUser(req: AuthRequest, res: Response): Promise<void> {
    const user = await UserService.updateUser(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'USER_UPDATED',
      resourceType: 'User',
      resourceId: user.id,
      metadata: { email: user.email, role: user.role },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, user, 200, 'User updated successfully');
  }

  public static async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    await UserService.deleteUser(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'USER_DELETED',
      resourceType: 'User',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'User deleted successfully');
  }
}
