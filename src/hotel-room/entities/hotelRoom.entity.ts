import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoomReservation } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'hotel_rooms' }) // Recommended: creates table hotel_rooms
export class HotelRoom extends GobalBaseEntity {
  @Column()
  pricePerNight: number;

  @Column({ default: 'Available ' })
  status: string;

  @Column()
  capacity: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelRooms, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  hotel: Hotel;

  @OneToMany(
    () => HotelRoomReservation,
    (hotelRoomReservation) => hotelRoomReservation.hotelRoom,
  )
  hotelRoomReservations: HotelRoomReservation[];
}
