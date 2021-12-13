import { Transaction } from "src/transaction/transaction.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    number: string;
    @Column()
    type: string;
    @Column()
    oderNumber: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    total: number;
    @Column({ type: "datetime" })
    date: string;
    @Column()
    payType: string;
    @Column({ nullable: true })
    referal: string;
    @Column({ nullable: true })
    bank: string;
    @Column()
    status: string;
    
}