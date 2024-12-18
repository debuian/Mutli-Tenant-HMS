import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class HotelRoom extends GobalBaseEntity {
  @Column()
  price: number;
}
