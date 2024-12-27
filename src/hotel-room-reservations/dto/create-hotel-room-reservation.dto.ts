import { IsDate, IsNotEmpty } from 'class-validator';
import { GobalIdDataType } from 'src/global/entity/BaseEntity';

export class CreateHotelRoomReservationDto {
  hotelId: GobalIdDataType;
  hotelRoomId: GobalIdDataType;
  hotelGuestId: GobalIdDataType;
  @IsDate()
  @IsNotEmpty()
  check_in_date: Date;
  @IsDate()
  @IsNotEmpty()
  check_out_date: Date;
}
