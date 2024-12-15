import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    const APP_PORT = process.env.APP_PORT ?? 3000;
    await app.listen(APP_PORT);
    console.log(
      `App running on port ${process.env['APP_PORT']} url http://localhost:${APP_PORT}`,
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
