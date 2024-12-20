import { IsNotEmpty } from 'class-validator';

export class CreateHotelGuestDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  contactNumber: string;
}
