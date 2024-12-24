import { Controller } from '@nestjs/common';
import { HotelTransactionsService } from './hotel-transactions.service';

@Controller('hotel-transactions')
export class HotelTransactionsController {
  constructor(private readonly hotelTransactionsService: HotelTransactionsService) {}
}
