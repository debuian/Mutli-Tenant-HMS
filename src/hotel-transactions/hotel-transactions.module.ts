import { Module } from '@nestjs/common';
import { HotelTransactionsService } from './hotel-transactions.service';
import { HotelTransactionsController } from './hotel-transactions.controller';

@Module({
  controllers: [HotelTransactionsController],
  providers: [HotelTransactionsService],
})
export class HotelTransactionsModule {}
