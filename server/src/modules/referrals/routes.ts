import { Router } from 'express';
import { ReferralController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { ROLES } from '../../config/constants.js';
import {
  createPartnerSchema,
  addPartnerResourceLinkSchema,
  updatePartnerStatusSchema,
  trackReferralClickSchema,
} from './schema.js';

// 1. Admin Partner Routes (Guarded: SUPER_ADMIN & ADMIN only)
const adminRouter = Router();
adminRouter.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));

adminRouter.post('/', validate(createPartnerSchema), ReferralController.createPartner);
adminRouter.get('/', ReferralController.getAllPartners);
adminRouter.get('/:id', ReferralController.getPartnerById);
adminRouter.post('/:id/links', validate(addPartnerResourceLinkSchema), ReferralController.addResourceLink);
adminRouter.patch('/:id/status', validate(updatePartnerStatusSchema), ReferralController.toggleStatus);

// 2. Partner Self Routes (Guarded: PARTNER role only, strictly scoped)
const partnerRouter = Router();
partnerRouter.use(requireAuth, requireRole([ROLES.PARTNER]));

partnerRouter.get('/dashboard', ReferralController.getPartnerDashboard);
partnerRouter.get('/leads', ReferralController.getPartnerLeads);

// 3. Public Referral Tracking Routes
const publicRouter = Router();
publicRouter.post('/track', validate(trackReferralClickSchema), ReferralController.trackClick);

export const adminPartnerRoutes = adminRouter;
export const partnerSelfRoutes = partnerRouter;
export const publicReferralRoutes = publicRouter;
