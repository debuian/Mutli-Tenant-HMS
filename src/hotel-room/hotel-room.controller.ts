import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('hotel-room')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get('room1')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const data = req.user;
    console.log(data);
    return { hotelData: data };
  }
}
