import { Lead, ILead } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { LeadStatus } from '../../config/constants.js';

export class LeadsService {
  public static async createLead(data: Partial<ILead>): Promise<ILead> {
    return Lead.create(data);
  }

  public static async getLeadsAdmin(query: {
    page?: number;
    limit?: number;
    status?: LeadStatus;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Lead.countDocuments(filter),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  public static async getLeadById(id: string): Promise<ILead> {
    const lead = await Lead.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'NOT_FOUND');
    }
    return lead;
  }

  public static async updateLead(id: string, data: Partial<ILead>): Promise<ILead> {
    const lead = await Lead.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'NOT_FOUND');
    }
    Object.assign(lead, data);
    await lead.save();
    return lead;
  }

  public static async deleteLead(id: string): Promise<void> {
    const lead = await Lead.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'NOT_FOUND');
    }
    await Lead.findByIdAndDelete(id);
  }
}
