import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoomReservationEntity } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelSalesOrderDetails } from './hotel-sales-order-detail.entity';

export enum HotelSalesOrderStatus {
  Pending = 'PENDING',
  completed = 'COMPLETED',
}
@Entity({ name: 'hotel_sales_orders' })
export class HotelSalesOrderEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.salesOrders)
  hotel: HotelEntity;

  @ManyToOne(
    () => HotelRoomReservationEntity,
    (hotelRoomReservation) => hotelRoomReservation.salesOrder,
  )
  hotelRoomReservation: HotelRoomReservationEntity;

  @OneToMany(
    () => HotelSalesOrderDetails,
    (hotelSalesOrderDetails) => hotelSalesOrderDetails.hotelSalesOrder,
  )
  hotelSalesOrderDetails: HotelSalesOrderDetails[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  order_total_price: number;

  @Column({
    type: 'enum',
    enum: HotelSalesOrderStatus,
    default: HotelSalesOrderStatus.Pending,
  })
  order_status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
