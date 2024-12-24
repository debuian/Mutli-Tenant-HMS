import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelInvoiceDto } from './create-hotel-invoice.dto';

export class UpdateHotelInvoiceDto extends PartialType(CreateHotelInvoiceDto) {}
