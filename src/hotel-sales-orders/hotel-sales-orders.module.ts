import { Module } from '@nestjs/common';
import { HotelSalesOrdersService } from './hotel-sales-orders.service';
import { HotelSalesOrdersController } from './hotel-sales-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelSalesOrderEntity } from './entities/hotel-sales-order.entity';
import { HotelSalesOrderDetails } from './entities/hotel-sales-order-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelSalesOrderEntity, HotelSalesOrderDetails]),
  ],
  controllers: [HotelSalesOrdersController],
  providers: [HotelSalesOrdersService],
  exports: [HotelSalesOrdersService],
})
export class HotelSalesOrdersModule {}
