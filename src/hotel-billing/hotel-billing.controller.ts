import { Controller } from '@nestjs/common';
import { HotelBillingService } from './hotel-billing.service';

@Controller('hotel-billing')
export class HotelBillingController {
  constructor(private readonly hotelBillingService: HotelBillingService) {}
}
