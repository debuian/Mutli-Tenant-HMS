import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptors/gobal-response.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.listen(process.env.PORT ?? 3000);
    console.log('App running on port 3000 url http://localhost:3000');
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
