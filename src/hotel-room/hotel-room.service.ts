import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoom } from './entities/hotelRoom.entity';
import { Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoom)
    private readonly hotelRoomRepo: Repository<HotelRoom>,
    private readonly hotelService: HotelService,
  ) {}

  async create(createHotelRoomDto: CreateHotelRoomDto) {
    const hotel = await this.hotelService.findById(createHotelRoomDto.hotelId);
    if (!hotel) {
      throw new BadRequestException('Hotel ID is required for creating room');
    }
    const newHotelRoom = await this.hotelRoomRepo.create({
      hotel,
      pricePerNight: createHotelRoomDto.pricePerNight,
      capacity: createHotelRoomDto.capacity,
    });
    const hotelRoomInfo = await this.hotelRoomRepo.save(newHotelRoom);
    return hotelRoomInfo;
  }
  async findById(id: number): Promise<HotelRoom> {
    return this.hotelRoomRepo.findOneBy({ id });
  }
  async changeRoomStatus(id: number, status: string) {
    const hotelRoom = await this.findById(id);
    hotelRoom.status = status;
    return await this.hotelRoomRepo.save(hotelRoom);
  }
}
