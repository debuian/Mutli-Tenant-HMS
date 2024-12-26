import { Module } from '@nestjs/common';
import { HotelInvoicesService } from './hotel-invoices.service';
import { HotelInvoicesController } from './hotel-invoices.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelInvoiceEntity } from './entities/hotel-invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelInvoiceEntity])],
  controllers: [HotelInvoicesController],
  providers: [HotelInvoicesService],
  exports: [HotelInvoicesService],
})
export class HotelInvoicesModule {}
