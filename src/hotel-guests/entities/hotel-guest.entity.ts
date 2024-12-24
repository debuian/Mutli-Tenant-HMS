import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoomReservationEntity } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'hotel_guests' }) // Recommended: creates table hotel_guests
export class HotelGuestEntity extends GobalBaseEntity {
  @Column()
  fullName: string;
  @Column()
  contactNumber: string;
  @OneToMany(
    () => HotelRoomReservationEntity,
    (hotelRoomReservation) => hotelRoomReservation.hotelGuest,
  )
  hotelRoomReservations: HotelRoomReservationEntity[];
}
