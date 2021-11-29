import { Customer } from "src/customer/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Main {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    loanType: string;
    @Column({ nullable: true })
    oderNumber: string;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    loanAmount: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    dockCharge: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    totalLoanAmount: number;
    @Column({ type: 'int' })
    monthsCount: number;
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    interestRate: number;
    @Column({ type: 'int' })
    interestRateId: number;
    @Column({ type: 'date' })
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


}