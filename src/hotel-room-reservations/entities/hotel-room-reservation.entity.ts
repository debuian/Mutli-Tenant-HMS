import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelGuest } from 'src/hotel-guests/entities/hotel-guest.entity';
import { HotelRoom } from 'src/hotel-room/entities/hotelRoom.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'hotel_room_reservations' })
export class HotelRoomReservation extends GobalBaseEntity {
  @ManyToOne(() => Hotel, (hotel) => hotel.hotelRoomReservations, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  hotel: Hotel;

  @ManyToOne(() => HotelRoom, (hotelRoom) => hotelRoom.hotelRoomReservations, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  hotelRoom: HotelRoom;

  @ManyToOne(
    () => HotelGuest,
    (hotelGuest) => hotelGuest.hotelRoomReservations,
    { onDelete: 'SET NULL', nullable: false },
  )
  hotelGuest: HotelGuest;

  @Column()
  check_in_date: Date;
  @Column()
  check_out_date: Date;
}
