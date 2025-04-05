import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { PaymentsModule } from './payments/payments.module';
import { StripeModule } from './stripe/stripe.module';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT as string, 10),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.PGUSER !== 'postgres',
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    PaymentsModule,
    StripeModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class AppModule {}
