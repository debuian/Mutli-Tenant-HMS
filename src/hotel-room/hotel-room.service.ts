import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoomEntity } from './entities/hotelRoom.entity';
import { EntityManager, Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoomEntity)
    private readonly hotelRoomRepo: Repository<HotelRoomEntity>,
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
  async findById(id: number): Promise<HotelRoomEntity> {
    return this.hotelRoomRepo.findOne({
      where: { id },
      relations: ['hotel'],
    });
  }
  async changeRoomStatus(id: number, status: string) {
    const hotelRoom = await this.findById(id);
    hotelRoom.status = status;
    return await this.hotelRoomRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.changeRoomStatusWithTransaction(
          id,
          status,
          transactionalEntityManager,
        ),
    );
  }
  async changeRoomStatusWithTransaction(
    id: number,
    status: string,
    transactionalEntityManager: EntityManager,
  ) {
    const hotelRoom = await transactionalEntityManager.findOne(
      HotelRoomEntity,
      { where: { id } },
    );
    if (hotelRoom) {
      hotelRoom.status = status;
      return await transactionalEntityManager.save(hotelRoom);
    } else {
      throw new Error('Room not found');
    }
  }
  async getHotelRooms(hotelId: number): Promise<HotelRoomEntity[]> {
    return await this.hotelRoomRepo.find({
      where: { hotel: { id: hotelId } },
      relations: ['hotel'],
    });
  }
}
