import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelSalesOrdersService } from './hotel-sales-orders.service';
import { CreateHotelSalesOrderDto } from './dto/create-hotel-sales-order.dto';
import { UpdateHotelSalesOrderDto } from './dto/update-hotel-sales-order.dto';

@Controller('hotel-sales-orders')
export class HotelSalesOrdersController {
  constructor(
    private readonly hotelSalesOrdersService: HotelSalesOrdersService,
  ) {}

  @Post()
  create(@Body() createHotelSalesOrderDto: CreateHotelSalesOrderDto) {
    return this.hotelSalesOrdersService.create(createHotelSalesOrderDto);
  }
}
