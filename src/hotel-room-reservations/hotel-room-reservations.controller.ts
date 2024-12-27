import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller()
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
      reservationData: hotelRoomReservation,
    };
  }
}
