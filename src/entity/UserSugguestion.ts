import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class UserSugguestion {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text" })
	text: string;

	@Column({ type: "varchar", length: 25 })
	user_name: string;

	@CreateDateColumn()
	created_at: Date;

}