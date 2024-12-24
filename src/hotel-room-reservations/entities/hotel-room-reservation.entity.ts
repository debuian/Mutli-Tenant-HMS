import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelGuestEntity } from 'src/hotel-guests/entities/hotel-guest.entity';
import { HotelRoomEntity } from 'src/hotel-room/entities/hotelRoom.entity';
import { HotelSalesOrderEntity } from 'src/hotel-sales-orders/entities/hotel-sales-order.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'hotel_room_reservations' })
export class HotelRoomReservationEntity extends GobalBaseEntity {
  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelRoomReservations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  hotel: HotelEntity;

  @ManyToOne(
    () => HotelRoomEntity,
    (hotelRoom) => hotelRoom.hotelRoomReservations,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  hotelRoom: HotelRoomEntity;

  @ManyToOne(
    () => HotelGuestEntity,
    (hotelGuest) => hotelGuest.hotelRoomReservations,
    { onDelete: 'CASCADE', nullable: false },
  )
  hotelGuest: HotelGuestEntity;

  @OneToMany(
    () => HotelSalesOrderEntity,
    (hotelSalesOrder) => hotelSalesOrder.hotelRoomReservation,
  )
  salesOrder: HotelSalesOrderEntity[];

  @Column()
  check_in_date: Date;
  @Column()
  check_out_date: Date;
}
