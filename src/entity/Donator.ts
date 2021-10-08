import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Donator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  donator_name: string;

  @Column()
  password: string;
}