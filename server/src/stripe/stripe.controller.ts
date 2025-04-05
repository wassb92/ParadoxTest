// server/src/stripe/stripe.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Stripe from 'stripe';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('checkout')
  @ApiOperation({ summary: 'Créer une session de checkout pour un abonnement' })
  @ApiResponse({
    status: 201,
    description: 'Session de checkout créée avec succès',
    type: Object,
  })
  async createCheckout(
    @Body() body: { plan: string; userId: number },
  ): Promise<{ sessionId: string }> {
    try {
      const session = await this.stripeService.createCheckoutSession(
        body.userId,
        body.plan,
      );
      return { sessionId: session.id };
    } catch (error) {
      console.error(
        'Erreur lors de la création de la session de checkout',
        error,
      );
      throw new HttpException(
        'Erreur lors de la création de la session de checkout',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('subscription-update')
  @ApiOperation({
    summary:
      "Mettre à jour l'abonnement de l'utilisateur à partir d'une session Stripe et envoyer la facture",
  })
  @ApiResponse({
    status: 200,
    description: 'Abonnement mis à jour et facture envoyée avec succès',
  })
  async updateSubscription(
    @Body() body: { sessionId: string; userId: number; plan: string },
  ): Promise<{ message: string }> {
    try {
      // Récupérer la session Stripe
      const session: Stripe.Checkout.Session =
        await this.stripeService.retrieveCheckoutSession(body.sessionId);

      // Vérifier que la session correspond à une subscription réussie
      if (
        !session ||
        session.payment_status !== 'paid' ||
        !session.subscription
      ) {
        throw new HttpException(
          'Session invalide ou paiement non confirmé',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Mettre à jour l'utilisateur avec les informations d'abonnement
      await this.usersService.updateUser(body.userId, {
        subscriptionType:
          session.mode === 'subscription' && session.subscription
            ? 'active'
            : null,
        stripeSubscriptionId: session.subscription as string,
      });

      // Envoyer la facture par email via l'API Stripe
      if (session.customer) {
        const customerId = session.customer as string;
        // Déterminer le montant en centimes selon le plan fourni dans le body
        const amount = body.plan === 'monthly' ? 999 : 9999; // ex : 9,99€ ou 99,99€
        await this.stripeService.createAndSendInvoice(
          customerId,
          "Votre facture d'abonnement",
          amount,
        );
      }

      return {
        message: 'Abonnement mis à jour et facture envoyée avec succès',
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'abonnement", error);
      throw new HttpException(
        "Erreur lors de la mise à jour de l'abonnement",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('unsubscribe')
  @ApiOperation({ summary: "Se désabonner de l'abonnement Stripe" })
  @ApiResponse({
    status: 200,
    description: 'Désabonnement effectué avec succès',
  })
  async unsubscribe(
    @Body() body: { userId: number },
  ): Promise<{ message: string }> {
    // Récupérer l'utilisateur
    const user = await this.usersService.findById(body.userId);
    if (!user || !user.stripeSubscriptionId) {
      throw new HttpException(
        'Utilisateur ou abonnement non trouvé',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // Annuler l'abonnement Stripe
      await this.stripeService.cancelSubscription(user.stripeSubscriptionId);
      // Mettre à jour l'utilisateur : supprimer les infos d'abonnement
      await this.usersService.updateUser(body.userId, {
        subscriptionType: null,
        stripeSubscriptionId: null,
      });
      return { message: 'Vous êtes désabonné avec succès' };
    } catch (error) {
      console.error(
        "Erreur lors de l'annulation de l'abonnement Stripe",
        error,
      );
      throw new HttpException(
        "Erreur lors de l'annulation de l'abonnement",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
