import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';

@Controller('hotel-guests')
export class HotelGuestsController {
  constructor(private readonly hotelGuestsService: HotelGuestsService) {}

  @Post('createGuest')
  @UsePipes(ValidationPipe)
  async create(@Body() createHotelGuestDto: CreateHotelGuestDto) {
    const GuestInfo = await this.hotelGuestsService.create(createHotelGuestDto);
    return { message: 'Guest created Successfully', GuestInfo };
  }
}
