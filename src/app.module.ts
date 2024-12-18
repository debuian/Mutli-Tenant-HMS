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
import { HotelRoomModule } from './hotel-room/hotel-room.module';
import { AuthModule } from './auth/auth.module';
import { QueryExceptionFilter } from './global/exceptions/query-exception.filter';

@Module({
  imports: [
    AppRoutingModule.forRootAsync({ fileExtension: 'routes.js' }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [DatabaseConfig],
      envFilePath: '.env', // Ensure this points to your .env file
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('databaseConfig'),
    }),
    HotelModule,
    HotelRoomModule,
    AuthModule,
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
