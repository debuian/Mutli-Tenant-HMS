import { IsEnum, IsNumber, IsString } from 'class-validator';
import { HotelInvoiceStatus } from '../entities/hotel-invoice.entity';

export class CreateHotelInvoiceDto {
  hotel_id: number;
  inovice_number: string;
  @IsString()
  @IsEnum(HotelInvoiceStatus)
  status: string;
  @IsNumber()
  total_amount: number;
  @IsNumber()
  due_amount: number;
  due_date: Date;
}
