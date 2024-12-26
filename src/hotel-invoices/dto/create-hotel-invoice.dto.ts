import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  HotelInvoiceStatus,
  HotelInvoiceReferenceType,
} from '../entities/hotel-invoice.entity';

export class CreateHotelInvoiceDto {
  hotel_id: number;
  invoice_number: string;
  status: HotelInvoiceStatus;
  total_amount: number;
  due_amount: number;
  due_date: Date;
  referenceId: number;
  referenceType: HotelInvoiceReferenceType;
  hotelSalesOrderId?: number;
  hotelPurchaseOrderId?: number;
  hotelTransactionId: number;
}
