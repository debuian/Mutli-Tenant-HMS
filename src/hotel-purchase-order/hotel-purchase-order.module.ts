import { Module } from '@nestjs/common';
import { HotelPurchaseOrderService } from './hotel-purchase-order.service';
import { HotelPurchaseOrderController } from './hotel-purchase-order.controller';

@Module({
  controllers: [HotelPurchaseOrderController],
  providers: [HotelPurchaseOrderService],
  exports: [HotelPurchaseOrderService],
})
export class HotelPurchaseOrderModule {}
