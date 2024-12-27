import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelSalesOrderDto } from './dto/create-hotel-sales-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HotelSalesOrderEntity,
  HotelSalesOrderStatus,
} from './entities/hotel-sales-order.entity';
import { HotelSalesOrderDetails } from './entities/hotel-sales-order-detail.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HotelSalesOrdersService {
  constructor(
    @InjectRepository(HotelSalesOrderEntity)
    private readonly hotelSalesOrderRepo: Repository<HotelSalesOrderEntity>,
    @InjectRepository(HotelSalesOrderDetails)
    private readonly hotelSalesOrderDetailsRepo: Repository<HotelSalesOrderDetails>,
  ) {}
  async create(createHotelSalesOrderDto: CreateHotelSalesOrderDto) {
    return await this.hotelSalesOrderRepo.manager.transaction(
      async (transactionalEntityManager) =>
        await this.createWithTransaction(
          createHotelSalesOrderDto,
          transactionalEntityManager,
        ),
    );
  }
  async createWithTransaction(
    createHotelSalesOrderDto: CreateHotelSalesOrderDto,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const newHotelSalesOrder = this.hotelSalesOrderRepo.create({
        hotel: { id: createHotelSalesOrderDto.hotel_id },
        hotelRoomReservation: {
          id: createHotelSalesOrderDto.hotel_room_reservation_id,
        },
        order_date: createHotelSalesOrderDto.order_date,
        order_total_price: createHotelSalesOrderDto.order_total_price,
        order_status: createHotelSalesOrderDto.order_status,
      });

      // Save sales order using transaction manager
      const savedHotelSalesOrder = await transactionalEntityManager.save(
        HotelSalesOrderEntity,
        newHotelSalesOrder,
      );
      const newHotelSalesOrderDetails =
        createHotelSalesOrderDto.hotelSalesOrderDetails.map((detail) =>
          this.hotelSalesOrderDetailsRepo.create({
            hotelSalesOrder: { id: savedHotelSalesOrder.id },
            quantity: detail.quantity,
            unit_price: detail.unit_price,
          }),
        );
      await transactionalEntityManager.save(
        HotelSalesOrderDetails,
        newHotelSalesOrderDetails,
      );
      return {
        ...savedHotelSalesOrder,
        details: newHotelSalesOrderDetails,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateStatusWithTransaction(
    id: number,
    status: HotelSalesOrderStatus,
    transactionalEntityManager: EntityManager,
  ) {
    const hotelSalesOrder = await transactionalEntityManager.findOne(
      HotelSalesOrderEntity,
      { where: { id } },
    );
    if (hotelSalesOrder) {
      hotelSalesOrder.order_status = status;
      return await transactionalEntityManager.save(hotelSalesOrder);
    } else {
      throw new NotFoundException('Sales Order not found', {
        description: 'hotelSalesOrder Lookup Failed',
        cause: `hotelSalesOrder with ID ${id} does not exist`,
      });
    }
  }
}
