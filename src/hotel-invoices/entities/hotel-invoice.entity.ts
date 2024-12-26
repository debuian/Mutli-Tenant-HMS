import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelPurchaseOrderEntity } from 'src/hotel-purchase-order/entities/hotel-purchase-order.entity';
import { HotelReceiptEntity } from 'src/hotel-receipts/entities/hotel-receipt.entity';
import { HotelSalesOrderEntity } from 'src/hotel-sales-orders/entities/hotel-sales-order.entity';
import { HotelTransactionEntity } from 'src/hotel-transactions/entities/hotel-transaction.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';

export enum HotelInvoiceStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Partial = 'PARTIAL',
  Issued = 'ISSUED',
}

export enum HotelInvoiceReferenceType {
  SalesOrder = 'SALES_ORDER',
  PurchaseOrder = 'PURCHASE_ORDER',
}

@Entity({ name: 'hotel_invoices' })
@Unique(['id', 'invoice_number'])
export class HotelInvoiceEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelInvoice, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  hotel: HotelEntity;

  @OneToOne(
    () => HotelSalesOrderEntity,
    (hotelSalesOrder) => hotelSalesOrder.hotelInvoice,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn()
  hotelSalesOrder?: HotelSalesOrderEntity;

  @OneToOne(
    () => HotelPurchaseOrderEntity,
    (hotelPurchaseOrder) => hotelPurchaseOrder.hotelInvoice,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn()
  hotelPurchaseOrder?: HotelPurchaseOrderEntity;

  @OneToMany(
    () => HotelReceiptEntity,
    (hotelReceipt) => hotelReceipt.hotelInvoice,
  )
  hotelReceipt: HotelReceiptEntity[];

  @OneToOne(
    () => HotelTransactionEntity,
    (hotelTransaction) => hotelTransaction.hotelInvoice,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn() // Add this since Invoice will own the relationship
  hotelTransaction: HotelTransactionEntity;

  @Column()
  invoice_number: string;

  @Column()
  reference_id: number;

  @Column({
    type: 'enum',
    enum: HotelInvoiceReferenceType,
  })
  reference_type: string;

  @Column({
    type: 'enum',
    enum: HotelInvoiceStatus,
    default: HotelInvoiceStatus.Pending,
  })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  due_amount: number;

  @Column({ type: 'timestamp' })
  due_date: Date;
}
