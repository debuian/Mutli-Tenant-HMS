import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoomReservation } from './entities/hotel-room-reservation.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelGuestsService } from 'src/hotel-guests/hotel-guests.service';
import { HotelRoomService } from 'src/hotel-room/hotel-room.service';
import e from 'express';

@Injectable()
export class HotelRoomReservationsService {
  constructor(
    @InjectRepository(HotelRoomReservation)
    private readonly hotelRoomreservationRepo: Repository<HotelRoomReservation>,
    private hotelService: HotelService,
    private HotelRoomService: HotelRoomService,
    private HotelGuestsService: HotelGuestsService,
  ) {}
  async create(createHotelRoomReservationDto: CreateHotelRoomReservationDto) {
    const {
      hotelRoomId,
      hotelId,
      hotelGuestId,
      check_in_date,
      check_out_date,
    } = createHotelRoomReservationDto;

    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);
    console.log(checkOutDate <= checkInDate);
    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Invalid date range', {
        description: 'Date Validation Failed',
        cause: 'Check-out date must be after check-in date',
      });
    }

    if (checkInDate < new Date()) {
      throw new BadRequestException('Invalid check-in date', {
        description: 'Date Validation Failed',
        cause: 'Check-in date cannot be in the past',
      });
    }
    const hotelRoom = await this.HotelRoomService.findById(hotelRoomId);
    console.log(hotelRoom);
    if (hotelRoom.hotel.id !== hotelId) {
      throw new UnauthorizedException('Cannot book room from different hotel', {
        description: 'Hotel Validation Failed',
        cause: `Room ${hotelRoomId} does not belong to hotel ${hotelId}`,
      });
    }
    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found', {
        description: 'Room Lookup Failed',
        cause: `Room with ID ${hotelRoomId} does not exist`,
      });
    }
    if (hotelRoom.status.trim() !== 'Available') {
      throw new BadRequestException('The room is not available for booking', {
        description: 'Room Status Conflict',
        cause: `Room with ID ${hotelRoom.id} has status ${hotelRoom.status}`,
      });
    }

    const [hotelResult, hotelGuestResult] = await Promise.allSettled([
      this.hotelService.findById(hotelId),
      this.HotelGuestsService.findById(hotelGuestId),
    ]);
    if (
      hotelResult.status !== 'fulfilled' ||
      hotelGuestResult.status !== 'fulfilled'
    ) {
      throw new BadRequestException(
        'Failed to fetch hotel or guest information',
        {
          description: 'Lookup Failed',
          cause: 'One or more required lookups failed',
        },
      );
    }
    if (!hotelResult.value) {
      throw new NotFoundException('Hotel not found', {
        description: 'Hotel Lookup Failed',
        cause: `Hotel with ID ${hotelId} does not exist`,
      });
    }

    if (!hotelGuestResult.value) {
      throw new NotFoundException('Hotel guest not found', {
        description: 'Hotel Guest Lookup Failed',
        cause: `Hotel Guest with ID ${hotelGuestId} does not exist`,
      });
    }
    const hotelValue = hotelResult.value;
    const hotelGuestValue = hotelGuestResult.value;

    const newReservation = this.hotelRoomreservationRepo.create({
      hotel: hotelValue,
      hotelRoom,
      hotelGuest: hotelGuestValue,
      check_in_date,
      check_out_date,
    });
    this.HotelRoomService.changeRoomStatus(hotelRoom.id, 'booked');
    return await this.hotelRoomreservationRepo.save(newReservation);
  }
}
