import { Router } from 'express';
import { PaymentController } from './controller.js';
import { validate } from '../../middlewares/validate.js';
import { checkoutSchema, verifyPaymentSchema, bookingCheckoutSchema, verifyBookingPaymentSchema } from './schema.js';

const router = Router();

router.post('/checkout', validate(checkoutSchema), PaymentController.checkout);
router.post('/verify', validate(verifyPaymentSchema), PaymentController.verifyPayment);
router.post('/booking-checkout', validate(bookingCheckoutSchema), PaymentController.bookingCheckout);
router.post('/booking-verify', validate(verifyBookingPaymentSchema), PaymentController.verifyBookingPayment);
router.post('/webhook', PaymentController.webhook);

export const paymentRoutes = router;
