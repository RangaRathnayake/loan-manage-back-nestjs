import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'http://rmcinvesment.com/', 'https://rmcinvesment.com/']
  })
  await app.listen(3001);
}
bootstrap();
