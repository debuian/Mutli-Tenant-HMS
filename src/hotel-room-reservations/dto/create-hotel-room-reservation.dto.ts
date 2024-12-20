import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateHotelRoomReservationDto {
  @IsDate()
  @IsNotEmpty()
  check_in_date: Date;
  @IsDate()
  @IsNotEmpty()
  check_out_date: Date;
  hotelId: number;
  hotelRoomId: number;
  hotelGuestId: number;
}
