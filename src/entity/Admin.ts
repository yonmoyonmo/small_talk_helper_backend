import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique:true})
	admin_name: string;

	@Column()
	password: string;
}