import { Router } from 'express';
import { UserController } from './controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from './schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(requireAuth, requireRole([ROLES.SUPER_ADMIN]));

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validate(createUserSchema), UserController.createUser);
router.patch('/:id', validate(updateUserSchema), UserController.updateUser);
router.put('/:id', validate(updateUserSchema), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const userRoutes = router;
