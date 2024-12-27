import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export type GobalIdDataType = number;
@Entity()
export class GobalBaseEntity {
  @PrimaryGeneratedColumn()
  id: GobalIdDataType;
}
