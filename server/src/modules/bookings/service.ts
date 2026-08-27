import { Booking, IBooking } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { BookingStatus } from '../../config/constants.js';

export class BookingsService {
  public static async createBooking(data: Partial<IBooking>): Promise<IBooking> {
    return Booking.create(data);
  }

  public static async getBookingsAdmin(query: {
    page?: number;
    limit?: number;
    status?: BookingStatus;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Booking.countDocuments(filter),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  public static async getBookingById(id: string): Promise<IBooking> {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404, 'NOT_FOUND');
    }
    return booking;
  }

  public static async updateBooking(id: string, data: Partial<IBooking>): Promise<IBooking> {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404, 'NOT_FOUND');
    }
    Object.assign(booking, data);
    await booking.save();
    return booking;
  }

  public static async deleteBooking(id: string): Promise<void> {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404, 'NOT_FOUND');
    }
    await Booking.findByIdAndDelete(id);
  }
}
