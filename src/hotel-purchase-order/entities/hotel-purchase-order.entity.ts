import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelInvoiceEntity } from 'src/hotel-invoices/entities/hotel-invoice.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { HotelPurchaseOrderDetailsEntity } from './hotel-purchase-order-details.entity';

export enum HotelPurchaseOrderStatus {
  Issued = 'ISSUED',
  Cancelled = 'CANCELLED',
  Arrived = 'ARRIVED',
}

@Entity({ name: 'hotel_purchase_orders' })
export class HotelPurchaseOrderEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelPurchaseOrder, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  hotel: HotelEntity;

  @OneToOne(
    () => HotelInvoiceEntity,
    (hotelInvoice) => hotelInvoice.hotelPurchaseOrder,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  hotelInvoice: HotelInvoiceEntity;

  @OneToMany(
    () => HotelPurchaseOrderDetailsEntity,
    (hotelPurchaseOrderDetails) => hotelPurchaseOrderDetails.hotelPurchaseOrder,
    { cascade: true },
  )
  hotelPurchaseOrderDetails: HotelPurchaseOrderDetailsEntity[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: HotelPurchaseOrderStatus,
    default: HotelPurchaseOrderStatus.Issued,
  })
  status: HotelPurchaseOrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;
}
