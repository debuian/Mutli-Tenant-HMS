import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelGuestDto } from './create-hotel-guest.dto';

export class UpdateHotelGuestDto extends PartialType(CreateHotelGuestDto) {}
