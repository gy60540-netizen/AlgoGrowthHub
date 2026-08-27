import { Router } from 'express';
import { SiteSettingsController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { updateSiteSettingsSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get('/', SiteSettingsController.getSettings);

adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));
adminRouter.get('/', SiteSettingsController.getSettings);
adminRouter.patch('/', validate(updateSiteSettingsSchema), SiteSettingsController.updateSettings);
adminRouter.put('/', validate(updateSiteSettingsSchema), SiteSettingsController.updateSettings);

export const publicSiteSettingsRoutes = publicRouter;
export const adminSiteSettingsRoutes = adminRouter;
