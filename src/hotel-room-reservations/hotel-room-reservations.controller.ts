import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { log } from 'console';
import { GobalIdDataType } from 'src/global/entity/BaseEntity';

@Controller()
export class HotelRoomReservationsController {
  constructor(
    private readonly hotelRoomReservationsService: HotelRoomReservationsService,
  ) {}

  @Post('create/:RoomId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Request() req,
    @Param('RoomId') hotelRoomId: GobalIdDataType,
    @Body() createHotelRoomReservationDto: CreateHotelRoomReservationDto,
  ) {
    const hotelData = req.user;
    const hotelId = hotelData.hotelId;
    createHotelRoomReservationDto.hotelId = hotelId;
    createHotelRoomReservationDto.hotelRoomId = hotelRoomId;
    const hotelRoomReservation = await this.hotelRoomReservationsService.create(
      createHotelRoomReservationDto,
    );
    return {
      message: 'Reservation Created Successfully',
      reservationData: hotelRoomReservation,
    };
  }
}
