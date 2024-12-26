import { Injectable } from '@nestjs/common';
import { CreateHotelReceiptDto } from './dto/create-hotel-receipt.dto';
import { UpdateHotelReceiptDto } from './dto/update-hotel-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelReceiptEntity } from './entities/hotel-receipt.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HotelReceiptsService {
  constructor(
    @InjectRepository(HotelReceiptEntity)
    private readonly hotelReceiptRepo: Repository<HotelReceiptEntity>,
  ) {}
  async create(createHotelReceiptDto: CreateHotelReceiptDto) {
    return await this.hotelReceiptRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.createWithTransaction(
          createHotelReceiptDto,
          transactionalEntityManager,
        ),
    );
  }

  async createWithTransaction(
    createHotelReceiptDto: CreateHotelReceiptDto,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const newHotelReceipt = await this.hotelReceiptRepo.create({
        hotelInvoice: { id: createHotelReceiptDto.hotel_inovice_id },
        paid_amount: createHotelReceiptDto.paid_amount,
        payment_date: createHotelReceiptDto.payment_date,
        payment_method: createHotelReceiptDto.payment_method,
      });
      return await transactionalEntityManager.save(
        HotelReceiptEntity,
        newHotelReceipt,
      );
    } catch (error) {
      throw error;
    }
  }
}
