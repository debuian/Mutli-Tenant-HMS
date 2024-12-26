import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelInvoiceEntity } from 'src/hotel-invoices/entities/hotel-invoice.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

export enum HotelTransactionType {
  credit = 'CREDIT', // This is a credit transaction money is added to the hotel account
  debit = 'DEBIT', // This is a debit transaction money is removed from the hotel account
}
export enum HotelTransactionStatus {
  Pending = 'PENDING',
  success = 'SUCCESS',
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
}
@Entity({ name: 'hotel_transactions' })
export class HotelTransactionEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelTransactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hotel: HotelEntity;

  @OneToOne(
    () => HotelInvoiceEntity,
    (hotelInvoice) => hotelInvoice.hotelTransaction,
    { onDelete: 'CASCADE' },
  )
  hotelInvoice?: HotelInvoiceEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'enum', enum: HotelTransactionType })
  transaction_type: HotelTransactionType;

  @Column()
  method: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column({
    type: 'enum',
    enum: HotelTransactionStatus,
    default: HotelTransactionStatus.Pending,
  })
  status: HotelTransactionStatus;
}
