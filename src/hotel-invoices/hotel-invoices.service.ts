import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelInvoiceEntity } from './entities/hotel-invoice.entity';
import { EntityManager, Repository } from 'typeorm';
import { refCount } from 'rxjs';

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
        invoice_number: createHotelInvoiceDto.invoice_number,
        status: createHotelInvoiceDto.status,
        total_amount: createHotelInvoiceDto.total_amount,
        due_amount: createHotelInvoiceDto.due_amount,
        due_date: createHotelInvoiceDto.due_date,
        reference_id: createHotelInvoiceDto.referenceId,
        reference_type: createHotelInvoiceDto.referenceType,
        hotelSalesOrder: createHotelInvoiceDto.hotelSalesOrderId
          ? { id: createHotelInvoiceDto.hotelSalesOrderId }
          : null,
        hotelPurchaseOrder: createHotelInvoiceDto.hotelPurchaseOrderId
          ? { id: createHotelInvoiceDto.hotelPurchaseOrderId }
          : null,
        hotelTransaction: { id: createHotelInvoiceDto.hotelTransactionId },
      });
      const savedHotelInvoice = await transactionalEntityManager.save(
        HotelInvoiceEntity,
        neHotelInvoice,
      );
      return savedHotelInvoice;
    } catch (error) {
      console.error('Error saving hotel invoice:', error);

      throw error;
    }
  }

  async updateStatusWithTransaction(
    id: number,
    status: string,
    transactionalEntityManager: EntityManager,
  ) {
    await transactionalEntityManager.update(HotelInvoiceEntity, id, {
      status,
    });
    const updateHotelInvoice = await transactionalEntityManager.findOne(
      HotelInvoiceEntity,
      { where: { id } },
    );
    if (!updateHotelInvoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return updateHotelInvoice;
  }
}
