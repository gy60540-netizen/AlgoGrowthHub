import { Router } from 'express';
import { AuthController } from './controller.js';
import { validate } from '../../middlewares/validate.js';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema.js';
import { requireAuth } from '../../middlewares/auth.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), AuthController.register);
router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshTokenSchema), AuthController.refresh);
router.post('/logout', requireAuth, AuthController.logout);
router.get('/me', requireAuth, AuthController.getMe);

export const authRoutes = router;
