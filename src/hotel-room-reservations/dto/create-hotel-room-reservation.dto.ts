import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { GobalIdDataType } from 'src/global/entity/BaseEntity';

export class CreateHotelRoomReservationDto {
  //NOon Validaating Field
  hotelId: GobalIdDataType;
  hotelRoomId: GobalIdDataType;
  hotelGuestId: GobalIdDataType;

  //Valdating Field
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  check_in_date: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  check_out_date: Date;
}
