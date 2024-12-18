import { IsNotEmpty } from 'class-validator';

export class CreateHotelRoomDto {
  @IsNotEmpty()
  pricePerNight: number;

  hotelId: number;

  @IsNotEmpty()
  capacity: number;

  status?: string;
}
