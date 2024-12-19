import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(@InjectRepository(Hotel) private hotelRepo: Repository<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
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
}
