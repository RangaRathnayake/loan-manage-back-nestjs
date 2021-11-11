import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Privilage {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    icon: string;
    @Column({ nullable: true })
    link: string;
    @Column({ nullable: true })
    int: number;
    @Column({ nullable: true })
    string: string;
    @Column({ nullable: true })
    other: string;
    @Column({ nullable: true })
    status: number;
}