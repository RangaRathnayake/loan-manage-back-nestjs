import { Main } from "src/main/main.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Arrears {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "date" })
    createdDate: string;
    @Column({ type: "date" })
    updatedDate: string;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    arrears: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    warrant: number;
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, })
    over: number;
    @Column()
    arrearsDayCount: number;
    @ManyToOne(() => Main, main => main.arrearss)
    main: Main;
    @Column()
    status: number;
}