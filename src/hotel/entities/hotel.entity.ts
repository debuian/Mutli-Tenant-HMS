import { Exclude } from 'class-transformer';
import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoomReservation } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { HotelRoom } from 'src/hotel-room/entities/hotelRoom.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel extends GobalBaseEntity {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => HotelRoom, (hotelRoom) => hotelRoom.hotel)
  hotelRooms: HotelRoom[];

  @OneToMany(
    () => HotelRoomReservation,
    (hotelRoomReservation) => hotelRoomReservation.hotel,
  )
  hotelRoomReservations: HotelRoomReservation[];
}
