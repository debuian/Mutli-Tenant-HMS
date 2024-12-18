import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('hotelRooms')
export class HotelRoom extends GobalBaseEntity {
  @Column()
  pricePerNight: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelRooms, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  hotel: Hotel;

  @Column({ nullable: true })
  hotelId: number;

  @Column({ default: 'Available ' })
  status: string;

  @Column()
  capacity: number;
}
