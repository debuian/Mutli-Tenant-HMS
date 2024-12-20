import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { UpdateHotelRoomReservationDto } from './dto/update-hotel-room-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoomReservation } from './entities/hotel-room-reservation.entity';
import { Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelGuestsService } from 'src/hotel-guests/hotel-guests.service';
import { HotelRoomService } from 'src/hotel-room/hotel-room.service';

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
    const hotel = await this.hotelService.findById(
      createHotelRoomReservationDto.hotelId,
    );
    const hotelRoom = await this.HotelRoomService.findById(
      createHotelRoomReservationDto.hotelRoomId,
    );
    const hotelGuest = await this.HotelGuestsService.findById(
      createHotelRoomReservationDto.hotelGuestId,
    );
    console.log(hotel, hotelRoom, hotelGuest);
    if (hotelRoom.status != 'Available ') {
      throw new ConflictException(`The room  is not available. `, {
        description: 'Room Status Conflict',
        cause: `Room with ${hotelRoom.id} has status ${hotelRoom.status}`,
      });
    }

    const newReservation = this.hotelRoomreservationRepo.create({
      hotel,
      hotelRoom,
      hotelGuest,
      check_in_date: createHotelRoomReservationDto.check_in_date,
      check_out_date: createHotelRoomReservationDto.check_out_date,
    });
    this.HotelRoomService.changeRoomStatus(hotelRoom.id, 'booked');
    return await this.hotelRoomreservationRepo.save(newReservation);
  }
}
