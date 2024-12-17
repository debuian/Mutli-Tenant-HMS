import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class HotelLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Tero bau password empty xa' })
  password: string;
}
