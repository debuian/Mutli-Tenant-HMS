import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelInvoicesService } from './hotel-invoices.service';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';

@Controller('hotel-invoices')
export class HotelInvoicesController {
  constructor(private readonly hotelInvoicesService: HotelInvoicesService) {}

  @Post()
  create(@Body() createHotelInvoiceDto: CreateHotelInvoiceDto) {
    return this.hotelInvoicesService.create(createHotelInvoiceDto);
  }
}
