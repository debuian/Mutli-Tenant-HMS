import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { hotelModule } from './hotel/hotel.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { GobalExceptionFilter } from './common/exceptions/gobal-exception.filter';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.modules';

@Module({
  imports: [
    hotelModule,
    AdminModule,
    AppRoutingModule.forRootAsync({ fileExtension: 'routes.js' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GobalExceptionFilter,
    },
  ],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('AppModule initialized');
  }
  onModuleDestroy() {
    console.log('AppModule is being destroyed');
  }
}
