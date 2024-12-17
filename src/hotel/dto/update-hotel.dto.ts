import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';

export class UPdateHotelDto extends PartialType(CreateHotelDto) {}
