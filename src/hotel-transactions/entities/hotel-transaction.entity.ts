import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

export enum HotelTransactionType {
  credit = 'CREDIT',
  debit = 'DEBIT',
}
export enum HotelTransactionStatus {
  Pending = 'PENDING',
  success = 'SUCCESS',
  failed = 'FAILED',
}
@Entity({ name: 'hotel_transactions' })
export class HotelTransactionEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelTransactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hotel: HotelEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'enum', enum: HotelTransactionType })
  transaction_type: HotelTransactionType;

  @Column()
  method: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column({
    type: 'enum',
    enum: HotelTransactionStatus,
    default: HotelTransactionStatus.Pending,
  })
  status: HotelTransactionStatus;
}
