import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { ExpertTeamService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AuditLogService } from '../auditLogs/service.js';

export class ExpertTeamController {
  public static async getPublishedMembers(req: Request, res: Response): Promise<void> {
    const featuredOnly = req.query.featured === 'true';
    const members = await ExpertTeamService.getPublishedMembers(featuredOnly);
    sendSuccess(res, members, 200, 'Published team members fetched successfully');
  }

  public static async getAllMembersAdmin(_req: AuthRequest, res: Response): Promise<void> {
    const members = await ExpertTeamService.getAllMembersAdmin();
    sendSuccess(res, members, 200, 'Admin team members list fetched successfully');
  }

  public static async getMemberById(req: Request, res: Response): Promise<void> {
    const member = await ExpertTeamService.getMemberById(req.params.id as string);
    sendSuccess(res, member, 200, 'Team member fetched successfully');
  }

  public static async createMember(req: AuthRequest, res: Response): Promise<void> {
    const member = await ExpertTeamService.createMember(req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'TEAM_MEMBER_CREATED',
      resourceType: 'ExpertTeam',
      resourceId: member.id,
      metadata: { name: member.name, role: member.role },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendCreated(res, member, 'Team member created successfully');
  }

  public static async updateMember(req: AuthRequest, res: Response): Promise<void> {
    const member = await ExpertTeamService.updateMember(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'TEAM_MEMBER_UPDATED',
      resourceType: 'ExpertTeam',
      resourceId: member.id,
      metadata: { name: member.name, isPublished: member.isPublished },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, member, 200, 'Team member updated successfully');
  }

  public static async deleteMember(req: AuthRequest, res: Response): Promise<void> {
    await ExpertTeamService.deleteMember(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'TEAM_MEMBER_DELETED',
      resourceType: 'ExpertTeam',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Team member deleted successfully');
  }
}
