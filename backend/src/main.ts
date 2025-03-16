import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend URL
  app.enableCors({ origin: 'http://localhost:8000' });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
