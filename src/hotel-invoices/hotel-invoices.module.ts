import { Module } from '@nestjs/common';
import { HotelInvoicesService } from './hotel-invoices.service';
import { HotelInvoicesController } from './hotel-invoices.controller';

@Module({
  controllers: [HotelInvoicesController],
  providers: [HotelInvoicesService],
})
export class HotelInvoicesModule {}
