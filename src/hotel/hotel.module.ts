import { Module } from '@nestjs/common';
import { hotelController } from './hotel.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [hotelController],
  providers: [AppService],
})
export class hotelModule {}
