import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller()
export class HotelController {
  constructor(private readonly hotelSerivce: HotelService) {}

  @Post('SignUp')
  @UsePipes(ValidationPipe)
  async SignUp(@Body() createHotelDto: CreateHotelDto) {
    const result = await this.hotelSerivce.create(createHotelDto);
    const { password, ...hotelInfo } = result;
    return {
      message: `${createHotelDto.email} logged in succesfully`,
      hotelInfo,
    };
  }
}
