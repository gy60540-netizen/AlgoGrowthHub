import { Router } from 'express';
import { ClientResultsController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createClientResultSchema, updateClientResultSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public routes
publicRouter.get('/', ClientResultsController.getPublishedResults);
publicRouter.get('/:id', ClientResultsController.getResultById);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', ClientResultsController.getAllResultsAdmin);
adminRouter.get('/:id', ClientResultsController.getResultById);
adminRouter.post('/', validate(createClientResultSchema), ClientResultsController.createResult);
adminRouter.patch('/:id', validate(updateClientResultSchema), ClientResultsController.updateResult);
adminRouter.put('/:id', validate(updateClientResultSchema), ClientResultsController.updateResult);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), ClientResultsController.deleteResult);

export const publicClientResultRoutes = publicRouter;
export const adminClientResultRoutes = adminRouter;
