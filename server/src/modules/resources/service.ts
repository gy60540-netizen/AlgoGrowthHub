import { Resource, IResource } from './model.js';
import { Order } from '../orders/model.js';
import { AppError } from '../../utils/AppError.js';
import { CONTENT_STATUS, ORDER_STATUS } from '../../config/constants.js';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export class ResourcesService {
  public static async getPublishedResources(featuredOnly = false): Promise<IResource[]> {
    const filter: Record<string, any> = {
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    };
    if (featuredOnly) {
      filter.isFeatured = true;
    }
    return Resource.find(filter).sort({ order: 1 });
  }

  public static async getResourceBySlug(slug: string): Promise<IResource> {
    const resource = await Resource.findOne({
      slug,
      isPublished: true,
      status: CONTENT_STATUS.PUBLISHED,
    });
    if (!resource) {
      throw new AppError('Resource not found', 404, 'NOT_FOUND');
    }
    return resource;
  }

  public static async getAllResourcesAdmin(): Promise<IResource[]> {
    return Resource.find().sort({ order: 1 });
  }

  public static async getResourceById(id: string): Promise<IResource> {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new AppError('Resource not found', 404, 'NOT_FOUND');
    }
    return resource;
  }

  public static async createResource(data: Partial<IResource>): Promise<IResource> {
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }
    if (data.slug) {
      const existing = await Resource.findOne({ slug: data.slug });
      if (existing) {
        data.slug = `${data.slug}-${Date.now()}`;
      }
    }
    return Resource.create(data);
  }

  public static async updateResource(id: string, data: Partial<IResource>): Promise<IResource> {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new AppError('Resource not found', 404, 'NOT_FOUND');
    }

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    if (data.slug && data.slug !== resource.slug) {
      const existing = await Resource.findOne({ slug: data.slug });
      if (existing && existing.id !== id) {
        throw new AppError('A resource with this slug already exists', 409, 'CONFLICT');
      }
    }

    Object.assign(resource, data);
    await resource.save();
    return resource;
  }

  public static async deleteResource(id: string): Promise<void> {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new AppError('Resource not found', 404, 'NOT_FOUND');
    }
    await Resource.findByIdAndDelete(id);
  }

  public static async processDownloadAccess(
    resourceId: string,
    token?: string
  ): Promise<{ fileKey: string; fileName: string }> {
    const resource = await Resource.findById(resourceId);
    if (!resource || !resource.isPublished) {
      throw new AppError('Resource not found', 404, 'NOT_FOUND');
    }

    // Free resource: directly grant access & increment count
    if (resource.type === 'free') {
      await Resource.findByIdAndUpdate(resourceId, { $inc: { downloadCount: 1 } });
      return {
        fileKey: resource.fileKey,
        fileName: resource.fileName,
      };
    }

    // Premium resource: verify valid download token
    if (!token) {
      throw new AppError(
        'Access denied. A valid purchase download token is required for premium resources.',
        403,
        'RESOURCE_ACCESS_DENIED'
      );
    }

    const order = await Order.findOne({
      resourceId: resource.id,
      downloadToken: token,
      status: { $in: [ORDER_STATUS.PAID, ORDER_STATUS.FULFILLED] },
    });

    if (!order) {
      throw new AppError('Invalid or unverified download token', 403, 'RESOURCE_ACCESS_DENIED');
    }

    if (order.downloadExpiresAt && new Date() > order.downloadExpiresAt) {
      throw new AppError('Download link has expired. Please contact support.', 403, 'RESOURCE_ACCESS_DENIED');
    }

    return {
      fileKey: resource.fileKey,
      fileName: resource.fileName,
    };
  }
}
