import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const frontendHost = process.env.FRONTEND_HOST || 'localhost';
  const frontendPort = process.env.FRONTEND_PORT || '8000';
  const backendPort = process.env.BACKEND_PORT || '3000';

  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend URL
  app.enableCors({ origin: `http://${frontendHost}:${frontendPort}` });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(backendPort);
}
bootstrap();
