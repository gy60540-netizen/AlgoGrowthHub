import { Router } from 'express';
import { OrderController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));

router.get('/', OrderController.getOrdersAdmin);
router.get('/:id', OrderController.getOrderById);
router.post('/:id/refund', requireRole([ROLES.SUPER_ADMIN]), OrderController.refundOrder);

export const orderRoutes = router;
