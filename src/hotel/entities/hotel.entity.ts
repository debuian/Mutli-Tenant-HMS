import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel extends GobalBaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}
