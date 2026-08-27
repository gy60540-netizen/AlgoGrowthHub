import { Router } from 'express';
import { MediaController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { uploadMiddleware } from './upload.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(requireAuth, requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));

router.get('/', MediaController.getAllMedia);
router.post('/upload', uploadMiddleware.single('file'), MediaController.uploadFile);
router.delete('/:id', requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]), MediaController.deleteMedia);

export const mediaRoutes = router;
