import { Arrears } from "src/arrears/arrears.entity";
import { Customer } from "src/customer/customer.entity";
import { Transaction } from "src/transaction/transaction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Main {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    loanType: string;
    @Column({ nullable: true })
    oderNumber: string;
    @Column({ nullable: true })
    oderNumberInt: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    loanAmount: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    dockCharge: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    totalLoanAmount: number;
    @Column({ type: 'int', nullable: true })
    monthsCount: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, })
    interestRate: number;
    @Column({ type: 'int', nullable: true })
    interestRateId: number;
    @Column({ type: 'date', nullable: true })
    startDate: string;
    @Column()
    userId: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capitalPerMonth: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interestPerMonth: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    totalPerMonth: number;
    @Column({ nullable: true })
    monthlyPayDate: string;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    NonRefundableAdvance: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    downPayment: number;
    @Column({ nullable: true })
    projectId: number;
    @Column({ nullable: true })
    projectName: string;
    @Column({ nullable: true })
    blockNumber: string;
    @Column({ nullable: true })
    propertyName: string;
    @Column({ nullable: true })
    propertyCode: string;
    @Column()
    status: number;
    @ManyToOne(() => Customer, customer => customer.mains)
    customer: Customer;
    @OneToMany(() => Transaction, transaction => transaction.main)
    transactions: Transaction[];
    @OneToMany(() => Arrears, arrears => arrears.main)
    arrearss: Arrears;


}