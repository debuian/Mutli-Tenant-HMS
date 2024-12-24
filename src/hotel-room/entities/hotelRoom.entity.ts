import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoomReservationEntity } from 'src/hotel-room-reservations/entities/hotel-room-reservation.entity';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum HotelRoomStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Reserved = 'RESERVED',
}
@Entity({ name: 'hotel_rooms' }) // Recommended: creates table hotel_rooms
export class HotelRoomEntity extends GobalBaseEntity {
  @Column()
  pricePerNight: number;

  @Column({
    type: 'enum',
    enum: HotelRoomStatus,
    default: HotelRoomStatus.Available,
  })
  status: string;

  @Column()
  capacity: number;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.hotelRooms, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  hotel: HotelEntity;

  @OneToMany(
    () => HotelRoomReservationEntity,
    (hotelRoomReservation) => hotelRoomReservation.hotelRoom,
  )
  hotelRoomReservations: HotelRoomReservationEntity[];
}
