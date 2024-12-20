import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';

@Controller('hotel-guests')
export class HotelGuestsController {
  constructor(private readonly hotelGuestsService: HotelGuestsService) {}

  @Post('createGuest')
  create(@Body() createHotelGuestDto: CreateHotelGuestDto) {
    return this.hotelGuestsService.create(createHotelGuestDto);
  }

  @Get()
  findAll() {
    return this.hotelGuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelGuestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHotelGuestDto: UpdateHotelGuestDto,
  ) {
    return this.hotelGuestsService.update(+id, updateHotelGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelGuestsService.remove(+id);
  }
}
