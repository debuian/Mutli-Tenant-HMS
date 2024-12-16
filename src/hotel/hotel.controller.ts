import { Controller, Get, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class HotelController {
  constructor(@InjectRepository(Hotel) private hotelRepo: Repository<Hotel>) {}

  @Get()
  async getProfile() {
    const data = await this.hotelRepo.find();
    console.log(data);
    return { hoteldata: data };
  }
}
