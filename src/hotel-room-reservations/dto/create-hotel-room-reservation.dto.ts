import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateHotelRoomReservationDto {
  hotelId: number;
  hotelRoomId: number;
  hotelGuestId: number;
  @IsDate()
  @IsNotEmpty()
  check_in_date: Date;
  @IsDate()
  @IsNotEmpty()
  check_out_date: Date;
}
