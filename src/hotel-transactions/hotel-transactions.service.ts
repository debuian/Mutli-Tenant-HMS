import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HotelTransactionEntity,
  HotelTransactionStatus,
} from './entities/hotel-transaction.entity';
import { CreateHotelTransactionDto } from './dto/create-hotel-transaction.dto';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HotelTransactionsService {
  constructor(
    @InjectRepository(HotelTransactionEntity)
    private readonly hotelTransactionRepo: Repository<HotelTransactionEntity>,
  ) {}

  async createWithTransaction(
    createHotelTransactionDto: CreateHotelTransactionDto,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const newHotelTransaction = this.hotelTransactionRepo.create({
        hotel: { id: createHotelTransactionDto.hotel_id },
        created_at: createHotelTransactionDto.created_at,
        transaction_type: createHotelTransactionDto.transaction_type,
        method: createHotelTransactionDto.method,
        description: createHotelTransactionDto.description,
        total_amount: createHotelTransactionDto.total_amount,
        status: createHotelTransactionDto.status,
      });
      return await transactionalEntityManager.save(
        HotelTransactionEntity,
        newHotelTransaction,
      );
    } catch (error) {
      throw error;
    }
  }

  async create(createHotelTransactionDto: CreateHotelTransactionDto) {
    return await this.hotelTransactionRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.createWithTransaction(
          createHotelTransactionDto,
          transactionalEntityManager,
        ),
    );
  }

  async updateStatusWithTransaction(
    id: number,
    status: HotelTransactionStatus,
    transactionalEntityManager: EntityManager,
  ) {
    // First perform the update
    await transactionalEntityManager.update(HotelTransactionEntity, id, {
      status,
    });

    // Then fetch the updated entity
    const updatedTransaction = await transactionalEntityManager.findOne(
      HotelTransactionEntity,
      {
        where: { id },
      },
    );

    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return updatedTransaction;
  }
}
