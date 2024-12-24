import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelReceiptEntity } from 'src/hotel-receipts/entities/hotel-receipt.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

export enum HotelInvoiceStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Parital = 'PARTIAL',
}

@Entity({ name: 'hotel_invoices' })
@Unique(['id', 'invoice_number'])
export class HotelInvoiceEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelInvoice)
  hotel: HotelEntity;

  @Column()
  invoice_number: string;

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

  @OneToMany(
    () => HotelReceiptEntity,
    (hotelReceipt) => hotelReceipt.hotelInvoice,
  )
  hotelReceipt: HotelReceiptEntity[];
}
