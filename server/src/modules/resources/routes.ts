import { Router } from 'express';
import { ResourcesController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createResourceSchema, updateResourceSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public routes
publicRouter.get('/', ResourcesController.getPublishedResources);
publicRouter.get('/:slug', ResourcesController.getResourceBySlug);
publicRouter.get('/:id/download', ResourcesController.download);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', ResourcesController.getAllResourcesAdmin);
adminRouter.get('/:id', ResourcesController.getResourceById);
adminRouter.post('/', validate(createResourceSchema), ResourcesController.createResource);
adminRouter.patch('/:id', validate(updateResourceSchema), ResourcesController.updateResource);
adminRouter.put('/:id', validate(updateResourceSchema), ResourcesController.updateResource);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), ResourcesController.deleteResource);

export const publicResourceRoutes = publicRouter;
export const adminResourceRoutes = adminRouter;
