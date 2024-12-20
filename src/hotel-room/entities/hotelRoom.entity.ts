import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'hotel_rooms' }) // Recommended: creates table hotel_rooms
export class HotelRoom extends GobalBaseEntity {
  @Column()
  pricePerNight: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelRooms, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  hotel: Hotel;

  @Column({ nullable: false })
  hotelId: number;

  @Column({ default: 'Available ' })
  status: string;

  @Column()
  capacity: number;
}
