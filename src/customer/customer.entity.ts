import { Main } from "src/main/main.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fullName: string;
    @Column()
    name: string;
    @Column()
    nic: string;
    @Column()
    address: string;
    @Column()
    mobile: string;
    @Column({ nullable: true })
    phone: string;
    @Column({ nullable: true })
    project: number;
    @Column({ nullable: true })
    block: string;
    @Column({ nullable: true })
    otherString: string;
    @Column({ nullable: true })
    otherInt: number;
    status: number;
    @OneToMany(() => Main, main => main.customer)
    mains: Main[];
}