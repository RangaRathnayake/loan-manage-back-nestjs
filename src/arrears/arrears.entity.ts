import { Main } from "src/main/main.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Arrears {
    forEach(arg0: (element: any) => void) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "date" })
    payDate: string;
    @Column({ type: "date", nullable: true })
    completeDate: string;
    @Column()
    installment: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capital: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interest: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capitalPaid: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interestPaid: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    capitalArrears: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    interestArrears: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    warrant: number;
    @ManyToOne(() => Main, main => main.arrearss)
    main: Main;
    @Column()
    status: number;
}