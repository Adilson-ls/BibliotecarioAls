import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { setupSwagger } from './config/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({ origin: true });
  
  setupSwagger(app);
  
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3333);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 3333}`);
  console.log(`API Documentation: http://localhost:${process.env.PORT ?? 3333}/api`);
}

bootstrap();
