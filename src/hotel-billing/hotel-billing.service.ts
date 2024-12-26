import { Injectable, NotFoundException } from '@nestjs/common';
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
import { PaymentDto, RoomBookingDto } from './dto/room-booking.dto';
import {
  HotelTransactionStatus,
  HotelTransactionType,
} from 'src/hotel-transactions/entities/hotel-transaction.entity';
import {
  HotelInvoiceEntity,
  HotelInvoiceReferenceType,
  HotelInvoiceStatus,
} from 'src/hotel-invoices/entities/hotel-invoice.entity';
import { CreateHotelReceiptDto } from 'src/hotel-receipts/dto/create-hotel-receipt.dto';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class HotelBillingService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly hotelSalesOrderService: HotelSalesOrdersService,
    private readonly hotelTransactionService: HotelTransactionsService,
    private readonly hotelInvoiceService: HotelInvoicesService,
    private readonly hotelPurchaseOrderService: HotelPurchaseOrderService,
    private readonly hotelReceiptService: HotelReceiptsService,
  ) {}

  async processRoomBookingBilling(
    roomBookingDtO: RoomBookingDto,
    transactionalEntityManager: EntityManager,
  ) {
    const createSalesOrderDto: CreateHotelSalesOrderDto = {
      hotel_id: roomBookingDtO.hotel_id,
      hotel_room_reservation_id: roomBookingDtO.hotel_room_reservation_id,
      hotelSalesOrderDetails: [
        {
          quantity: roomBookingDtO.quantity,
          unit_price: roomBookingDtO.unit_price,
        },
      ],
      order_date: roomBookingDtO.order_date,
      order_total_price: roomBookingDtO.order_total_price,
      order_status: HotelSalesOrderStatus.Pending,
    };
    const newHotelSalesOrder =
      await this.hotelSalesOrderService.createWithTransaction(
        createSalesOrderDto,
        transactionalEntityManager,
      );
    console.log('New Sales Order:', newHotelSalesOrder);
    const createHotelTransactionDto: CreateHotelTransactionDto = {
      hotel_id: roomBookingDtO.hotel_id,
      created_at: roomBookingDtO.order_date,
      transaction_type: HotelTransactionType.credit,
      method: 'cash',
      description: 'Room Reservation',
      total_amount: roomBookingDtO.order_total_price,
      status: HotelTransactionStatus.Pending,
    };
    const newHotelTransaction =
      await this.hotelTransactionService.createWithTransaction(
        createHotelTransactionDto,
        transactionalEntityManager,
      );
    console.log('New Transaction:', newHotelTransaction);

    const createHotelInoviceDto: CreateHotelInvoiceDto = {
      hotel_id: roomBookingDtO.hotel_id,
      invoice_number: 'ASDAS',
      status: HotelInvoiceStatus.Issued,
      total_amount: roomBookingDtO.order_total_price,
      due_amount: roomBookingDtO.order_total_price,
      due_date: roomBookingDtO.invoiceDueDate,
      referenceId: newHotelSalesOrder.id,
      referenceType: HotelInvoiceReferenceType.SalesOrder,
      hotelSalesOrderId: newHotelSalesOrder.id,
      hotelTransactionId: newHotelTransaction.id,
    };
    const newHotelInvoice =
      await this.hotelInvoiceService.createWithTransaction(
        createHotelInoviceDto,
        transactionalEntityManager,
      );
    console.log('New Invoice:', newHotelInvoice);
    const updatedHotelSalesOrder =
      await this.hotelSalesOrderService.updateStatusWithTransaction(
        newHotelSalesOrder.id,
        HotelSalesOrderStatus.Completed,
        transactionalEntityManager,
      );
    console.log('Updated Sales Order:', updatedHotelSalesOrder);

    return { updatedHotelSalesOrder, newHotelTransaction, newHotelInvoice };
  }
  private async generateInvoiceNumber(hotelId: number) {}

  async processPaymentWithTransaction(
    paymentDto: PaymentDto,
    transactionalEntityManager: EntityManager,
  ) {
    const hotelInvoice = await transactionalEntityManager.findOne(
      HotelInvoiceEntity,
      {
        where: { id: paymentDto.invoiceId },
        relations: {
          hotelTransaction: true, // Use the exact property name from your entity
        },
      },
    );
    if (!hotelInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    const currentDate = new Date();

    const createHotelRecipt: CreateHotelReceiptDto = {
      hotel_inovice_id: hotelInvoice.id,
      paid_amount: paymentDto.paid_amount,
      payment_date: currentDate,
      payment_method: paymentDto.method,
    };
    const newHotelReceipt =
      await this.hotelReceiptService.createWithTransaction(
        createHotelRecipt,
        transactionalEntityManager,
      );

    const hotelInoviceStatus =
      paymentDto.paid_amount < hotelInvoice.total_amount
        ? HotelInvoiceStatus.Partial
        : HotelInvoiceStatus.Paid;

    const updateHotelInvoice =
      await this.hotelInvoiceService.updateStatusWithTransaction(
        hotelInvoice.id,
        hotelInoviceStatus,
        transactionalEntityManager,
      );

    const updateHotelTransactionStatus =
      hotelInoviceStatus == HotelInvoiceStatus.Paid
        ? HotelTransactionStatus.success
        : HotelTransactionStatus.Pending;
    const updateHotelTransaction =
      await this.hotelTransactionService.updateStatusWithTransaction(
        hotelInvoice.hotelTransaction.id,
        updateHotelTransactionStatus,
        transactionalEntityManager,
      );
    console.log(updateHotelInvoice);
    console.log(updateHotelTransaction);

    return { newHotelReceipt, updateHotelInvoice, updateHotelTransaction };
  }
  async processPayment(paymentDto: PaymentDto) {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        return this.processPaymentWithTransaction(
          paymentDto,
          transactionalEntityManager,
        );
      },
    );
  }
}
