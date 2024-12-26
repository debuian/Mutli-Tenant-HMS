import { Exclude } from 'class-transformer';
import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelInvoiceEntity } from 'src/hotel-invoices/entities/hotel-invoice.entity';
import { HotelPurchaseOrderEntity } from 'src/hotel-purchase-order/entities/hotel-purchase-order.entity';
import { HotelRoomReservationEntity } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { HotelRoomEntity } from 'src/hotel-room/entities/hotelRoom.entity';
import { HotelSalesOrderEntity } from 'src/hotel-sales-orders/entities/hotel-sales-order.entity';
import { HotelTransactionEntity } from 'src/hotel-transactions/entities/hotel-transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'hotels' })
export class HotelEntity extends GobalBaseEntity {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => HotelRoomEntity, (hotelRoom) => hotelRoom.hotel)
  hotelRooms: HotelRoomEntity[];

  @OneToMany(
    () => HotelRoomReservationEntity,
    (hotelRoomReservation) => hotelRoomReservation.hotel,
  )
  hotelRoomReservations: HotelRoomReservationEntity[];

  @OneToMany(
    () => HotelTransactionEntity,
    (hotelTransaction) => hotelTransaction.hotel,
  )
  hotelTransactions: HotelTransactionEntity[];

  @OneToMany(
    () => HotelSalesOrderEntity,
    (hotelSalesOrder) => hotelSalesOrder.hotel,
  )
  hotelSalesOrders: HotelSalesOrderEntity[];

  @OneToMany(() => HotelInvoiceEntity, (hotelInvoice) => hotelInvoice.hotel)
  hotelInvoice: HotelInvoiceEntity[];

  @OneToMany(
    () => HotelPurchaseOrderEntity,
    (hotelPurchaseOrder) => hotelPurchaseOrder.hotel,
  )
  hotelPurchaseOrder: HotelPurchaseOrderEntity[];
}
