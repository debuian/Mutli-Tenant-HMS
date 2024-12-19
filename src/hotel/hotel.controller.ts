import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller()
export class HotelController {
  constructor(private readonly hotelSerivce: HotelService) {}
}
