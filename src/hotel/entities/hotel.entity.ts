import { Exclude } from 'class-transformer';
import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { HotelRoom } from 'src/hotel-room/entities/hotelRoom.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Hotels')
export class Hotel extends GobalBaseEntity {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => HotelRoom, (hotelRoom) => hotelRoom.hotel)
  hotelRooms: HotelRoom[];
}
