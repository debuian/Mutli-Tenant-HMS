import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GobalBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
