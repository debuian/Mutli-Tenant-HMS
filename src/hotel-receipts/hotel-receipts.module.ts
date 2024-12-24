import { Module } from '@nestjs/common';
import { HotelReceiptsService } from './hotel-receipts.service';
import { HotelReceiptsController } from './hotel-receipts.controller';

@Module({
  controllers: [HotelReceiptsController],
  providers: [HotelReceiptsService],
})
export class HotelReceiptsModule {}
