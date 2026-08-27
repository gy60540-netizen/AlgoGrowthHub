import { Creator, ICreator } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { CONTENT_STATUS } from '../../config/constants.js';

export class CreatorsService {
  public static async getPublishedCreators(featuredOnly = false): Promise<ICreator[]> {
    const filter: Record<string, any> = {
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    };
    if (featuredOnly) {
      filter.isFeatured = true;
    }
    return Creator.find(filter).sort({ order: 1 });
  }

  public static async getAllCreatorsAdmin(): Promise<ICreator[]> {
    return Creator.find().sort({ order: 1 });
  }

  public static async getCreatorById(id: string): Promise<ICreator> {
    const creator = await Creator.findById(id);
    if (!creator) {
      throw new AppError('Creator not found', 404, 'NOT_FOUND');
    }
    return creator;
  }

  public static async createCreator(data: Partial<ICreator>): Promise<ICreator> {
    return Creator.create(data);
  }

  public static async updateCreator(id: string, data: Partial<ICreator>): Promise<ICreator> {
    const creator = await Creator.findById(id);
    if (!creator) {
      throw new AppError('Creator not found', 404, 'NOT_FOUND');
    }
    Object.assign(creator, data);
    await creator.save();
    return creator;
  }

  public static async deleteCreator(id: string): Promise<void> {
    const creator = await Creator.findById(id);
    if (!creator) {
      throw new AppError('Creator not found', 404, 'NOT_FOUND');
    }
    await Creator.findByIdAndDelete(id);
  }
}
