import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelReceiptsService } from './hotel-receipts.service';
import { CreateHotelReceiptDto } from './dto/create-hotel-receipt.dto';
import { UpdateHotelReceiptDto } from './dto/update-hotel-receipt.dto';

@Controller('hotel-receipts')
export class HotelReceiptsController {
  constructor(private readonly hotelReceiptsService: HotelReceiptsService) {}

  @Post()
  create(@Body() createHotelReceiptDto: CreateHotelReceiptDto) {
    return this.hotelReceiptsService.create(createHotelReceiptDto);
  }
}
