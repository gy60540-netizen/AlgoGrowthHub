import { Router } from 'express';
import { ServicesController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createServiceSchema, updateServiceSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public routes
publicRouter.get('/', ServicesController.getPublishedServices);
publicRouter.get('/:slug', ServicesController.getServiceBySlug);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', ServicesController.getAllServicesAdmin);
adminRouter.get('/:id', ServicesController.getServiceById);
adminRouter.post('/', validate(createServiceSchema), ServicesController.createService);
adminRouter.patch('/:id', validate(updateServiceSchema), ServicesController.updateService);
adminRouter.put('/:id', validate(updateServiceSchema), ServicesController.updateService);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), ServicesController.deleteService);

export const publicServiceRoutes = publicRouter;
export const adminServiceRoutes = adminRouter;
