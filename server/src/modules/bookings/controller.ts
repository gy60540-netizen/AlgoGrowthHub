import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.js';
import { BookingsService } from './service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { BookingStatus } from '../../config/constants.js';
import { AuditLogService } from '../auditLogs/service.js';

export class BookingsController {
  public static async createBooking(req: Request, res: Response): Promise<void> {
    const booking = await BookingsService.createBooking(req.body);
    sendCreated(res, booking, 'Your strategy call has been requested! Our team will get back to you shortly.');
  }

  public static async getBookingsAdmin(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const status = req.query.status as BookingStatus;

    const result = await BookingsService.getBookingsAdmin({ page, limit, status });
    sendSuccess(res, result.bookings, 200, 'Bookings retrieved successfully', result.pagination);
  }

  public static async getBookingById(req: AuthRequest, res: Response): Promise<void> {
    const booking = await BookingsService.getBookingById(req.params.id as string);
    sendSuccess(res, booking, 200, 'Booking retrieved successfully');
  }

  public static async updateBooking(req: AuthRequest, res: Response): Promise<void> {
    const booking = await BookingsService.updateBooking(req.params.id as string, req.body);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'BOOKING_STATUS_UPDATED',
      resourceType: 'Booking',
      resourceId: booking.id,
      metadata: { status: booking.status, clientName: booking.name },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, booking, 200, 'Booking updated successfully');
  }

  public static async deleteBooking(req: AuthRequest, res: Response): Promise<void> {
    await BookingsService.deleteBooking(req.params.id as string);
    await AuditLogService.log({
      actorUserId: req.user?.userId,
      actorEmail: req.user?.email,
      action: 'BOOKING_DELETED',
      resourceType: 'Booking',
      resourceId: req.params.id as string,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] as string | undefined,
    });
    sendSuccess(res, null, 200, 'Booking deleted successfully');
  }
}
