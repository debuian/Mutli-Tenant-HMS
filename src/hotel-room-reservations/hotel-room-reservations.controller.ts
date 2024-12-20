import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('hotel-room-reservations')
export class HotelRoomReservationsController {
  constructor(
    private readonly hotelRoomReservationsService: HotelRoomReservationsService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createHotelRoomReservationDto: CreateHotelRoomReservationDto,
  ) {
    const hotelData = req.user;
    const hotelId = hotelData.hotelId;
    createHotelRoomReservationDto.hotelId = hotelId;
    const hotelRoomReservation = await this.hotelRoomReservationsService.create(
      createHotelRoomReservationDto,
    );
    return {
      message: 'Reservation Created Successfully',
      data: hotelRoomReservation,
    };
  }
}
