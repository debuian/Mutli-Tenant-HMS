import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelReceiptDto } from './create-hotel-receipt.dto';

export class UpdateHotelReceiptDto extends PartialType(CreateHotelReceiptDto) {}
