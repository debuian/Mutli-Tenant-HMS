import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelPurchaseOrderService } from './hotel-purchase-order.service';
import { CreateHotelPurchaseOrderDto } from './dto/create-hotel-purchase-order.dto';
import { UpdateHotelPurchaseOrderDto } from './dto/update-hotel-purchase-order.dto';

@Controller('hotel-purchase-order')
export class HotelPurchaseOrderController {
  constructor(private readonly hotelPurchaseOrderService: HotelPurchaseOrderService) {}

  @Post()
  create(@Body() createHotelPurchaseOrderDto: CreateHotelPurchaseOrderDto) {
    return this.hotelPurchaseOrderService.create(createHotelPurchaseOrderDto);
  }

  @Get()
  findAll() {
    return this.hotelPurchaseOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelPurchaseOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelPurchaseOrderDto: UpdateHotelPurchaseOrderDto) {
    return this.hotelPurchaseOrderService.update(+id, updateHotelPurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelPurchaseOrderService.remove(+id);
  }
}
