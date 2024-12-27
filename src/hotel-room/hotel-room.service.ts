import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoomEntity } from './entities/hotelRoom.entity';
import { EntityManager, Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';
import { GobalIdDataType } from 'src/global/entity/BaseEntity';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoomEntity)
    private readonly hotelRoomRepo: Repository<HotelRoomEntity>,
    private readonly hotelService: HotelService,
  ) {}

  async create(createHotelRoomDto: CreateHotelRoomDto) {
    const newHotelRoom = await this.hotelRoomRepo.create({
      hotel: { id: createHotelRoomDto.hotelId },
      pricePerNight: createHotelRoomDto.pricePerNight,
      capacity: createHotelRoomDto.capacity,
    });
    const hotelRoomInfo = await this.hotelRoomRepo.save(newHotelRoom);
    return hotelRoomInfo;
  }
  async findById(id: GobalIdDataType): Promise<HotelRoomEntity | null> {
    return await this.hotelRoomRepo.manager.transaction(
      async (transactionalEntityManager) => {
        return this.findByIdWithTransaction(id, transactionalEntityManager);
      },
    );
  }
  async findByIdWithTransaction(
    id: GobalIdDataType,
    transactionalEntityManager: EntityManager,
  ): Promise<HotelRoomEntity | null> {
    const entity = await transactionalEntityManager.findOne(HotelRoomEntity, {
      where: { id },
      relations: ['hotel'],
    });
    return entity;
  }
  async changeRoomStatus(
    id: GobalIdDataType,
    updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    return await this.hotelRoomRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.changeRoomStatusWithTransaction(
          id,
          updateHotelRoomDto,
          transactionalEntityManager,
        ),
    );
  }
  async changeRoomStatusWithTransaction(
    id: GobalIdDataType,
    updateHotelRoomDto: UpdateHotelRoomDto,
    transactionalEntityManager: EntityManager,
  ) {
    const hotelRoom = await this.findByIdWithTransaction(
      id,
      transactionalEntityManager,
    );
    if (!hotelRoom) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    if (hotelRoom.hotel.id != updateHotelRoomDto.hotelId) {
      throw new UnauthorizedException(`Cannot Update Other Room Details`);
    }
    await transactionalEntityManager.update(HotelRoomEntity, id, {
      status: updateHotelRoomDto.status,
    });
    return await this.findByIdWithTransaction(id, transactionalEntityManager);
  }
  async getHotelRooms(hotelId: GobalIdDataType): Promise<HotelRoomEntity[]> {
    return await this.hotelRoomRepo.find({
      where: { hotel: { id: hotelId } },
      relations: ['hotel'],
      order: { id: 'DESC' },
    });
  }
}
