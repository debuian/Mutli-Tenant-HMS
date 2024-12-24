import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.hotelInvoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelInvoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelInvoiceDto: UpdateHotelInvoiceDto) {
    return this.hotelInvoicesService.update(+id, updateHotelInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelInvoicesService.remove(+id);
  }
}
