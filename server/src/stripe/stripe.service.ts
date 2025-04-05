import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is not defined in environment variables',
      );
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createCheckoutSession(
    userId: number,
    plan: string,
  ): Promise<Stripe.Checkout.Session> {
    const priceId =
      plan === 'monthly'
        ? process.env.STRIPE_PRICE_MONTHLY
        : process.env.STRIPE_PRICE_ANNUAL;
    if (!priceId) {
      throw new Error('Price ID non défini');
    }
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
      client_reference_id: userId.toString(),
    });
    return session;
  }

  async retrieveCheckoutSession(
    sessionId: string,
  ): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }

  async cancelSubscription(
    subscriptionId: string,
  ): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  /**
   * Crée un invoice item, génère une facture avec collection_method 'send_invoice',
   * puis envoie la facture par email au client.
   * @param customerId L'identifiant Stripe du client
   * @param description La description de la facture
   * @param amount Le montant à facturer en centimes (ex: 999 pour 9,99€)
   */
  async createAndSendInvoice(
    customerId: string,
    description: string,
    amount: number,
  ): Promise<Stripe.Invoice> {
    await this.stripe.invoiceItems.create({
      customer: customerId,
      amount: amount,
      currency: 'eur',
      description: description,
    });

    const invoice = await this.stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      days_until_due: 7,
    });

    if (!invoice.id) {
      throw new Error('Invoice ID is undefined');
    }
    const sentInvoice = await this.stripe.invoices.sendInvoice(invoice.id);
    return sentInvoice;
  }
}
