import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Keyval {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    key: string;
    @Column()
    val: string;
    @Column({ nullable: true })
    description: string;
}