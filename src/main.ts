import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

bootstrap();
