import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    const config = new DocumentBuilder()
      .setTitle('Multi Tenant Hotel Managemnst System')
      .setVersion('1.0.0')
      .build();
    const documnet = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documnet);
    const APP_PORT = process.env.APP_PORT ?? 3000;
    await app.listen(APP_PORT);
    console.log(
      `App running on port ${process.env['APP_PORT']} url http://localhost:${APP_PORT} \n`,
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
