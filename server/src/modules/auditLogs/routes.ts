import { Router } from 'express';
import { AuditLogController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.get('/', requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), AuditLogController.getLogs);

export const auditLogRoutes = router;
