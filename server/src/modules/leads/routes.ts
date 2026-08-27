import { Router } from 'express';
import { LeadsController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createLeadSchema, updateLeadSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

// Public route to capture leads (Contact / Let's Work With Us / Inquiries)
publicRouter.post('/', validate(createLeadSchema), LeadsController.createLead);

// Admin routes
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', LeadsController.getLeadsAdmin);
adminRouter.get('/:id', LeadsController.getLeadById);
adminRouter.patch('/:id', validate(updateLeadSchema), LeadsController.updateLead);
adminRouter.patch('/:id/status', validate(updateLeadSchema), LeadsController.updateLead);
adminRouter.put('/:id', validate(updateLeadSchema), LeadsController.updateLead);
adminRouter.delete('/:id', requireRole([ROLES.SUPER_ADMIN]), LeadsController.deleteLead);

export const publicLeadRoutes = publicRouter;
export const adminLeadRoutes = adminRouter;
