import { Service, IService } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { CONTENT_STATUS } from '../../config/constants.js';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export class ServicesService {
  public static async getPublishedServices(): Promise<IService[]> {
    return Service.find({ isPublished: true, status: CONTENT_STATUS.PUBLISHED }).sort({ order: 1 });
  }

  public static async getServiceBySlug(slug: string): Promise<IService> {
    const service = await Service.findOne({
      slug,
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    });
    if (!service) {
      throw new AppError('Service not found', 404, 'NOT_FOUND');
    }
    return service;
  }

  public static async getAllServicesAdmin(): Promise<IService[]> {
    return Service.find().sort({ order: 1 });
  }

  public static async getServiceById(id: string): Promise<IService> {
    const service = await Service.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404, 'NOT_FOUND');
    }
    return service;
  }

  public static async createService(data: Partial<IService>): Promise<IService> {
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }
    if (data.slug) {
      const existing = await Service.findOne({ slug: data.slug });
      if (existing) {
        data.slug = `${data.slug}-${Date.now()}`;
      }
    }
    return Service.create(data);
  }

  public static async updateService(id: string, data: Partial<IService>): Promise<IService> {
    const service = await Service.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404, 'NOT_FOUND');
    }

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    if (data.slug && data.slug !== service.slug) {
      const existing = await Service.findOne({ slug: data.slug });
      if (existing && existing.id !== id) {
        throw new AppError('A service with this slug already exists', 409, 'CONFLICT');
      }
    }

    Object.assign(service, data);
    await service.save();
    return service;
  }

  public static async deleteService(id: string): Promise<void> {
    const service = await Service.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404, 'NOT_FOUND');
    }
    await Service.findByIdAndDelete(id);
  }
}
