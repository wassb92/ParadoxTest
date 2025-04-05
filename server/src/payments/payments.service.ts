import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error(
        'Stripe secret key is not defined in environment variables',
      );
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createCheckoutSession(
    customerId: string,
    subscriptionType: 'monthly' | 'annual',
  ): Promise<string> {
    const priceId =
      subscriptionType === 'monthly'
        ? process.env.STRIPE_PRICE_MONTHLY
        : process.env.STRIPE_PRICE_ANNUAL;

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    if (!session.url) {
      throw new Error('Session URL is null');
    }
    return session.url;
  }
}
