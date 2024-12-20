import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelRoomReservationDto } from './create-hotel-room-reservation.dto';

export class UpdateHotelRoomReservationDto extends PartialType(CreateHotelRoomReservationDto) {}
