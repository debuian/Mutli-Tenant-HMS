import {
  HotelTransactionStatus,
  HotelTransactionType,
} from '../entities/hotel-transaction.entity';

export class CreateHotelTransactionDto {
  hotelId: number;
  created_at: Date;
  transaction_type: HotelTransactionType;
  method: string;
  description: string;
  total_amount: number;
  status: HotelTransactionStatus;
}
