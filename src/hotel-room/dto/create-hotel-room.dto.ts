import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { HotelRoomStatus } from '../entities/hotelRoom.entity';

export class CreateHotelRoomDto {
  // Non Validating
  hotelId: number;

  //Validating
  @IsNotEmpty()
  pricePerNight: number;
  @IsNotEmpty()
  capacity: number;
  @IsEnum(HotelRoomStatus)
  @IsOptional()
  status?: HotelRoomStatus;
}
