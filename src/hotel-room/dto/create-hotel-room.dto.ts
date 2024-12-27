import { IsNotEmpty } from 'class-validator';
import { HotelRoomStatus } from '../entities/hotelRoom.entity';

export class CreateHotelRoomDto {
  hotelId: number;
  @IsNotEmpty()
  pricePerNight: number;

  @IsNotEmpty()
  capacity: number;

  status?: HotelRoomStatus;
}
