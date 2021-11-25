import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ nullable: true })
    location: string;
    @Column({ nullable: true })
    officer: string;
    @Column({ nullable: true })
    lotCount: number;
}