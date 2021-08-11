import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Sugguestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:25})
    sugguestion_type: string;

    @Column({type:"text"})
    sugguestion_text: string;

    @Column()
    count_likes: number;

    @Column()
    count_dislikes: number;

    @CreateDateColumn()
    created_at: Date;

}