import { Router } from 'express';
import { PaymentController } from './controller.js';
import { validate } from '../../middlewares/validate.js';
import { checkoutSchema, verifyPaymentSchema } from './schema.js';

const router = Router();

router.post('/checkout', validate(checkoutSchema), PaymentController.checkout);
router.post('/verify', validate(verifyPaymentSchema), PaymentController.verifyPayment);
router.post('/webhook', PaymentController.webhook);

export const paymentRoutes = router;
