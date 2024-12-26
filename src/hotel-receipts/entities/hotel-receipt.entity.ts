import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelInvoiceEntity } from 'src/hotel-invoices/entities/hotel-invoice.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'hotel_receipts' })
export class HotelReceiptEntity extends GobalBaseEntity {
  @ManyToOne(
    () => HotelInvoiceEntity,
    (hotelInvoice) => hotelInvoice.hotelReceipt,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  hotelInvoice: HotelInvoiceEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  paid_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column()
  payment_method: string;
}
