import { Injectable } from '@nestjs/common';
import { CreateHotelInvoiceDto } from 'src/hotel-invoices/dto/create-hotel-invoice.dto';
import { HotelInvoicesService } from 'src/hotel-invoices/hotel-invoices.service';
import { HotelPurchaseOrderService } from 'src/hotel-purchase-order/hotel-purchase-order.service';
import { HotelReceiptsService } from 'src/hotel-receipts/hotel-receipts.service';
import { CreateHotelSalesOrderDto } from 'src/hotel-sales-orders/dto/create-hotel-sales-order.dto';
import { HotelSalesOrderStatus } from 'src/hotel-sales-orders/entities/hotel-sales-order.entity';
import { HotelSalesOrdersService } from 'src/hotel-sales-orders/hotel-sales-orders.service';
import { CreateHotelTransactionDto } from 'src/hotel-transactions/dto/create-hotel-transaction.dto';
import { HotelTransactionsService } from 'src/hotel-transactions/hotel-transactions.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class HotelBillingService {
  constructor(
    private readonly hotelSalesOrderService: HotelSalesOrdersService,
    private readonly hotelTransactionService: HotelTransactionsService,
    private readonly hotelInvoiceService: HotelInvoicesService,
    private readonly hotelPurchaseOrderService: HotelPurchaseOrderService,
    private readonly hotelReceiptService: HotelReceiptsService,
  ) {}

  async processRoomBooking(
    createSalesOrderDto: CreateHotelSalesOrderDto,
    createHotelTransactionDto: CreateHotelTransactionDto,
    createHotelInoviceDto: CreateHotelInvoiceDto,
    transactionalEntityManager: EntityManager,
  ) {
    const newHotelSalesOrder =
      await this.hotelSalesOrderService.createWithTransaction(
        createSalesOrderDto,
        transactionalEntityManager,
      );
    console.log('New Sales Order:', newHotelSalesOrder);

    const newHotelTransaction =
      await this.hotelTransactionService.createWithTransaction(
        createHotelTransactionDto,
        transactionalEntityManager,
      );
    console.log('New Transaction:', newHotelTransaction);
    const newHotelInvoice =
      await this.hotelInvoiceService.createWithTransaction(
        createHotelInoviceDto,
        transactionalEntityManager,
      );
    console.log('New Invoice:', newHotelInvoice);
    const updatedHotelSalesOrder =
      await this.hotelSalesOrderService.updateStatusWithTransaction(
        newHotelSalesOrder.id,
        HotelSalesOrderStatus.Completed, // Use the proper enum status
        transactionalEntityManager,
      );
    console.log('Updated Sales Order:', updatedHotelSalesOrder);

    return { updatedHotelSalesOrder, newHotelTransaction, newHotelInvoice };
  }
}
