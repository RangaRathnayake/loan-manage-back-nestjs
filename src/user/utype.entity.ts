import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Privilage } from "./privilage.entity";
import { User } from "./user.entity";

@Entity()
export class Utype {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ nullable: true })
    description: string;
    @Column({ default: 1 })
    status: number;
    
    @OneToMany(() => User, user => user.utype)
    users: User[];

    @ManyToMany(() => Privilage)
    @JoinTable()
    privilages: Privilage[]

}