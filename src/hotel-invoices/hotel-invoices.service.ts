import { Injectable } from '@nestjs/common';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelInvoiceEntity } from './entities/hotel-invoice.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HotelInvoicesService {
  constructor(
    @InjectRepository(HotelInvoiceEntity)
    private readonly hotelInvoiceRepo: Repository<HotelInvoiceEntity>,
  ) {}
  async create(createHotelInvoiceDto: CreateHotelInvoiceDto) {
    return await this.hotelInvoiceRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.createWithTransaction(
          createHotelInvoiceDto,
          transactionalEntityManager,
        ),
    );
  }
  async createWithTransaction(
    createHotelInvoiceDto: CreateHotelInvoiceDto,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const neHotelInvoice = await this.hotelInvoiceRepo.create({
        hotel: { id: createHotelInvoiceDto.hotel_id },
        invoice_number: createHotelInvoiceDto.inovice_number,
        status: createHotelInvoiceDto.status,
        total_amount: createHotelInvoiceDto.total_amount,
        due_amount: createHotelInvoiceDto.due_amount,
        due_date: createHotelInvoiceDto.due_date,
      });
      const savedHotelInvoice = await transactionalEntityManager.save(
        HotelInvoiceEntity,
        neHotelInvoice,
      );
      return savedHotelInvoice;
    } catch (error) {
      throw error;
    }
  }
}
