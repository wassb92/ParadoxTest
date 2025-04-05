import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateCheckoutSessionDto {
  subscriptionType: 'monthly' | 'annual';
  customerId: string;
}

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('checkout-session')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une session de paiement Stripe' })
  async createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
  ): Promise<{ url: string }> {
    const url = await this.paymentsService.createCheckoutSession(
      dto.customerId,
      dto.subscriptionType,
    );
    return { url };
  }
}
