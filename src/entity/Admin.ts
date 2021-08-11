import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    admin_name: string;

    @Column()
    password : string;
}