import { Customer } from "src/customer/customer.entity";
import { Main } from "src/main/main.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Customer, customer => customer.transactions)
    customer: Customer;
    @ManyToOne(() => Main, main => main.transactions)
    main: Main;
    @ManyToOne(() => User, user => user.transactions)
    user: User;
    @Column({ type: "datetime" })
    day: string;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capital: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interest: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    warant: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    dockCharge: number;
    @Column({ default: 0, })
    monthCount: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    nonRefund: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    advance: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    over: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    otherPay: number;    
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    total: number;
    @Column()
    payType: string;
    @Column({ nullable: true })
    cheque: number;
    @Column()
    loanType: string;
    @Column()
    interestRate: number;
    @Column()
    status: number;

}