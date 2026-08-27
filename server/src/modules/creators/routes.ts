import { Router } from 'express';
import { CreatorsController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createCreatorSchema, updateCreatorSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public routes
publicRouter.get('/', CreatorsController.getPublishedCreators);
publicRouter.get('/:id', CreatorsController.getCreatorById);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', CreatorsController.getAllCreatorsAdmin);
adminRouter.get('/:id', CreatorsController.getCreatorById);
adminRouter.post('/', validate(createCreatorSchema), CreatorsController.createCreator);
adminRouter.patch('/:id', validate(updateCreatorSchema), CreatorsController.updateCreator);
adminRouter.put('/:id', validate(updateCreatorSchema), CreatorsController.updateCreator);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), CreatorsController.deleteCreator);

export const publicCreatorRoutes = publicRouter;
export const adminCreatorRoutes = adminRouter;
