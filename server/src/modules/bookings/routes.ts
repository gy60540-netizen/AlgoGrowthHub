import { Router } from 'express';
import { BookingsController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createBookingSchema, updateBookingSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public route to book a call session
publicRouter.post('/', validate(createBookingSchema), BookingsController.createBooking);

// Admin routes to manage bookings
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', BookingsController.getBookingsAdmin);
adminRouter.get('/:id', BookingsController.getBookingById);
adminRouter.patch('/:id', validate(updateBookingSchema), BookingsController.updateBooking);
adminRouter.patch('/:id/status', validate(updateBookingSchema), BookingsController.updateBooking);
adminRouter.put('/:id', validate(updateBookingSchema), BookingsController.updateBooking);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN]), BookingsController.deleteBooking);

export const publicBookingRoutes = publicRouter;
export const adminBookingRoutes = adminRouter;
