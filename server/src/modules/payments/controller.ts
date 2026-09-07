import { Request, Response } from 'express';
import { PaymentService } from './service.js';
import { sendSuccess } from '../../utils/response.js';

export class PaymentController {
  public static async checkout(req: Request, res: Response): Promise<void> {
    const result = await PaymentService.initiateCheckout(req.body);
    sendSuccess(res, result, 200, 'Checkout initiated successfully');
  }

  public static async verifyPayment(req: Request, res: Response): Promise<void> {
    const result = await PaymentService.verifyPayment(req.body);
    sendSuccess(res, result, 200, 'Payment verified successfully');
  }

  public static async bookingCheckout(req: Request, res: Response): Promise<void> {
    const result = await PaymentService.initiateBookingCheckout(req.body);
    sendSuccess(res, result, 200, 'Booking checkout initiated successfully');
  }

  public static async verifyBookingPayment(req: Request, res: Response): Promise<void> {
    const result = await PaymentService.verifyBookingPayment(req.body);
    sendSuccess(res, result, 200, 'Booking payment verified successfully');
  }

  public static async webhook(req: Request, res: Response): Promise<void> {
    // Idempotent webhook handler
    sendSuccess(res, { received: true }, 200, 'Webhook processed successfully');
  }
}

