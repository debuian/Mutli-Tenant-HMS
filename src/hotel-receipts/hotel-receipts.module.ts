import { Module } from '@nestjs/common';
import { HotelReceiptsService } from './hotel-receipts.service';
import { HotelReceiptsController } from './hotel-receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelReceiptEntity } from './entities/hotel-receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelReceiptEntity])],
  controllers: [HotelReceiptsController],
  providers: [HotelReceiptsService],
  exports: [HotelReceiptsService],
})
export class HotelReceiptsModule {}
