import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    await app.listen(process.env.PORT ?? 3000);
    console.log('App running on port 3000 url http://localhost:3000');
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
