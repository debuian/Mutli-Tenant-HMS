import {
  HotelTransactionStatus,
  HotelTransactionType,
} from '../entities/hotel-transaction.entity';

export class CreateHotelTransactionDto {
  hotel_id: number;
  created_at: Date;
  transaction_type: HotelTransactionType;
  method: string;
  description: string;
  total_amount: number;
  status: HotelTransactionStatus;
}
