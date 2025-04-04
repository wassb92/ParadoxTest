import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import axios, { AxiosError } from 'axios';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Paradox')
    .setDescription("Documentation de l'API Paradox")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);

  setInterval(() => {
    void (async () => {
      try {
        const appUrl = await app.getUrl();
        if (typeof appUrl === 'string') {
          try {
            await axios
              .get(`${appUrl}/`)
              .then(() => console.log('Ping OK'))
              .catch((error: AxiosError) => {
                console.error('Ping failed', error.message);
              });
          } catch (error) {
            console.error('Ping failed', error);
          }
        } else {
          console.error('Invalid app URL');
        }
      } catch (error) {
        console.error('Ping échoué', error);
      }
    })();
  }, 870000);
}
void bootstrap();
