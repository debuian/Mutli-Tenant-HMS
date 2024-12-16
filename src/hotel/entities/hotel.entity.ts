import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column()
  Name: string;

  @Column()
  owner: string;

  @Column()
  Staff: string;

  @Column()
  abc: string;
}
