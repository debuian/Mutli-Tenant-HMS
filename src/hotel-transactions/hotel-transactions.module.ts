import { Module } from '@nestjs/common';
import { HotelTransactionsService } from './hotel-transactions.service';
import { HotelTransactionsController } from './hotel-transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelTransactionEntity } from './entities/hotel-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelTransactionEntity])],
  controllers: [HotelTransactionsController],
  providers: [HotelTransactionsService],
  exports: [HotelTransactionsService],
})
export class HotelTransactionsModule {}
