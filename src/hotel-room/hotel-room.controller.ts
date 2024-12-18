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
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('hotel-room')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post('CreateRoom')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async CreateRoom(
    @Request() req,
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ) {
    const hotelData = req.user;
    const HotelId = hotelData.HotelId;
    // Creating error for referance
    // const HotelId = 5;
    createHotelRoomDto.hotelId = HotelId;
    console.log(createHotelRoomDto);
    const result = await this.hotelRoomService.create(createHotelRoomDto);

    return { message: 'Created', data: result };
  }
}
