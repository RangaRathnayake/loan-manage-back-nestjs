import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://luxebubble.lk','https://test.luxebubble.lk']
  })
  await app.listen(3000);
}
bootstrap();
