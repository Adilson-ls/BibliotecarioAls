import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3333);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 3333}`);
}

bootstrap();
