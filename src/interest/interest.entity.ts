import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interest {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    rate: number;
    @Column({ default: 1 })
    status: number;
}