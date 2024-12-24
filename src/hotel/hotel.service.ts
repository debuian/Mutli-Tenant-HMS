import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntity) private hotelRepo: Repository<HotelEntity>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<HotelEntity> {
    const newHotel = this.hotelRepo.create(createHotelDto);
    const hotelInfo = await this.hotelRepo.save(newHotel);
    return hotelInfo;
  }

  async checkHotelExist(email: string) {
    const userExist = await this.hotelRepo.findOneBy({ email });
    if (userExist) {
      return userExist;
    }
    return false;
  }
  async findById(id: number): Promise<HotelEntity> {
    return this.hotelRepo.findOneBy({ id });
  }
}
