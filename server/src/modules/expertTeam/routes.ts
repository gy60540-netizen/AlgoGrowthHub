import { Router } from 'express';
import { ExpertTeamController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createExpertTeamSchema, updateExpertTeamSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public routes
publicRouter.get('/', ExpertTeamController.getPublishedMembers);
publicRouter.get('/:id', ExpertTeamController.getMemberById);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', ExpertTeamController.getAllMembersAdmin);
adminRouter.get('/:id', ExpertTeamController.getMemberById);
adminRouter.post('/', validate(createExpertTeamSchema), ExpertTeamController.createMember);
adminRouter.patch('/:id', validate(updateExpertTeamSchema), ExpertTeamController.updateMember);
adminRouter.put('/:id', validate(updateExpertTeamSchema), ExpertTeamController.updateMember);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), ExpertTeamController.deleteMember);

export const publicExpertTeamRoutes = publicRouter;
export const adminExpertTeamRoutes = adminRouter;
