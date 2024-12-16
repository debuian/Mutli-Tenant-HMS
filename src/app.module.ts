import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GobalExceptionFilter } from './global/exceptions/gobal-exception.filter';
import { AppRoutingModule } from './app-routing.modules';
import { GlobalResponseInterceptor } from './global/interceptors/gobal-response.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelModule } from './hotel/hotel.module';
import { DatabaseConfig } from './global/config';

@Module({
  imports: [
    HotelModule,
    AppRoutingModule.forRootAsync({ fileExtension: 'routes.js' }),

    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [DatabaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('databaseConfig'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
  ],
})
export class AppModule {}
