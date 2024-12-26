import { Body, Controller, Param, Post } from '@nestjs/common';
import { HotelBillingService } from './hotel-billing.service';
import { PaymentDto } from './dto/room-booking.dto';

@Controller('hotel-billing')
export class HotelBillingController {
  constructor(private readonly hotelBillingService: HotelBillingService) {}

  @Post('/generateReceipt/:InoviceId')
  async InvoicePaid(
    @Param('InoviceId') InoviceId: number,
    @Body() paymnetDto: PaymentDto,
  ) {
    paymnetDto.invoiceId = InoviceId;
    const result = await this.hotelBillingService.processPayment(paymnetDto);
    console.log(result);
    return { message: 'Receipt Creadt SuccessFully', result };
  }
}
