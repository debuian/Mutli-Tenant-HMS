import { Injectable } from '@nestjs/common';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelGuestEntity } from './entities/hotel-guest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelGuestsService {
  constructor(
    @InjectRepository(HotelGuestEntity)
    private readonly hotelGuestRepo: Repository<HotelGuestEntity>,
  ) {}
  async create(createHotelGuestDto: CreateHotelGuestDto) {
    const guestInfo = this.hotelGuestRepo.create(createHotelGuestDto);
    return await this.hotelGuestRepo.save(guestInfo);
  }

  findAll() {
    return `This action returns all hotelGuests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelGuest`;
  }

  update(id: number, updateHotelGuestDto: UpdateHotelGuestDto) {
    return `This action updates a #${id} hotelGuest`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelGuest`;
  }
  async findById(id: number): Promise<HotelGuestEntity> {
    return this.hotelGuestRepo.findOneBy({ id });
  }
}
