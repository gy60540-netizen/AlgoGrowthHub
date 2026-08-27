import { ExpertTeamMember, IExpertTeamMember } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { CONTENT_STATUS } from '../../config/constants.js';

export class ExpertTeamService {
  public static async getPublishedMembers(featuredOnly = false): Promise<IExpertTeamMember[]> {
    const filter: Record<string, any> = {
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    };
    if (featuredOnly) {
      filter.isFeatured = true;
    }
    return ExpertTeamMember.find(filter).sort({ order: 1 });
  }

  public static async getAllMembersAdmin(): Promise<IExpertTeamMember[]> {
    return ExpertTeamMember.find().sort({ order: 1 });
  }

  public static async getMemberById(id: string): Promise<IExpertTeamMember> {
    const member = await ExpertTeamMember.findById(id);
    if (!member) {
      throw new AppError('Team member not found', 404, 'NOT_FOUND');
    }
    return member;
  }

  public static async createMember(data: Partial<IExpertTeamMember>): Promise<IExpertTeamMember> {
    return ExpertTeamMember.create(data);
  }

  public static async updateMember(
    id: string,
    data: Partial<IExpertTeamMember>
  ): Promise<IExpertTeamMember> {
    const member = await ExpertTeamMember.findById(id);
    if (!member) {
      throw new AppError('Team member not found', 404, 'NOT_FOUND');
    }
    Object.assign(member, data);
    await member.save();
    return member;
  }

  public static async deleteMember(id: string): Promise<void> {
    const member = await ExpertTeamMember.findById(id);
    if (!member) {
      throw new AppError('Team member not found', 404, 'NOT_FOUND');
    }
    await ExpertTeamMember.findByIdAndDelete(id);
  }
}
