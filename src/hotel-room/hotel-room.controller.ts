import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller()
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post('CreateRoom')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async CreateRoom(
    @Request() req,
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ) {
    const hotelData = req.user;
    console.log(hotelData);
    const HotelId = hotelData.hotelId;
    // Creating error for referance
    //**************** */ error hotel Td can be null ******************** solve
    // Error formating left for referance
    // const HotelId = null;
    createHotelRoomDto.hotelId = HotelId;
    console.log(createHotelRoomDto);
    const result = await this.hotelRoomService.create(createHotelRoomDto);
    return { message: 'Created', data: result };
  }
}
