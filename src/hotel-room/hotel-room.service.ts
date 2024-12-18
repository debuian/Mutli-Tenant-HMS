import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoom } from './entities/hotelRoom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoom)
    private readonly hotelRoomRepo: Repository<HotelRoom>,
  ) {}

  async create(createHotelRoomDto: CreateHotelRoomDto) {
    const newHotelRoom = await this.hotelRoomRepo.create(createHotelRoomDto);
    const hotelRoomInfo = await this.hotelRoomRepo.save(newHotelRoom);
    return hotelRoomInfo;
  }
}
