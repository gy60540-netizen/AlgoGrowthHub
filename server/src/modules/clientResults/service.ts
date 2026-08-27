import { ClientResult, IClientResult } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { CONTENT_STATUS } from '../../config/constants.js';

export class ClientResultsService {
  public static async getPublishedResults(featuredOnly = false): Promise<IClientResult[]> {
    const filter: Record<string, any> = {
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    };
    if (featuredOnly) {
      filter.isFeatured = true;
    }
    return ClientResult.find(filter).sort({ order: 1 });
  }

  public static async getAllResultsAdmin(): Promise<IClientResult[]> {
    return ClientResult.find().sort({ order: 1 });
  }

  public static async getResultById(id: string): Promise<IClientResult> {
    const result = await ClientResult.findById(id);
    if (!result) {
      throw new AppError('Client result not found', 404, 'NOT_FOUND');
    }
    return result;
  }

  public static async createResult(data: Partial<IClientResult>): Promise<IClientResult> {
    return ClientResult.create(data);
  }

  public static async updateResult(id: string, data: Partial<IClientResult>): Promise<IClientResult> {
    const result = await ClientResult.findById(id);
    if (!result) {
      throw new AppError('Client result not found', 404, 'NOT_FOUND');
    }
    Object.assign(result, data);
    await result.save();
    return result;
  }

  public static async deleteResult(id: string): Promise<void> {
    const result = await ClientResult.findById(id);
    if (!result) {
      throw new AppError('Client result not found', 404, 'NOT_FOUND');
    }
    await ClientResult.findByIdAndDelete(id);
  }
}
