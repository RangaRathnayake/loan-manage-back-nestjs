import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    month: number;
    @Column()
    year: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    rental: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capital: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interest: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    warrant: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    doc: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    nonref: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    advance: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    other: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    total: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    expence: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    balance: number;
    @Column({ type: 'longtext', nullable: true })
    updated: string;

}