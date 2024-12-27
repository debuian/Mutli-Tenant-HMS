import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GobalIdDataType } from 'src/global/entity/BaseEntity';
import { UpdateHotelRoomReservationDto } from 'src/hotel-room-reservations/dto/update-hotel-room-reservation.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';

@Controller()
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post('createRoom')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async CreateRoom(
    @Request() req,
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ) {
    const hotelData = req.user;
    const HotelId = hotelData.hotelId;
    createHotelRoomDto.hotelId = HotelId;
    const result = await this.hotelRoomService.create(createHotelRoomDto);
    return { message: 'Hotel Room created Succesfully', HotelRoomInfo: result };
  }

  @Get('getRooms')
  @UseGuards(JwtAuthGuard)
  async GetHotelRoomsForHotel(@Request() req) {
    const hotelData = req.user;
    const HotelId = hotelData.hotelId;
    const result = await this.hotelRoomService.getHotelRooms(HotelId);
    return { message: 'Hotel Rooms for Hotel', HotelRooms: result };
  }

  @Patch('/:roomId')
  @UseGuards(JwtAuthGuard)
  async updateRoomStatus(
    @Request() req,
    @Param('roomId') roomId: GobalIdDataType,
    @Body() updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    console.log(updateHotelRoomDto.status);
    const hotelData = req.user;
    const HotelId = hotelData.hotelId;
    updateHotelRoomDto.hotelId = HotelId;
    const result = await this.hotelRoomService.changeRoomStatus(
      roomId,
      updateHotelRoomDto,
    );
    return {
      message: `Hotel Room status cahnged to ${updateHotelRoomDto.status}`,
      RoomData: result,
    };
  }
}
