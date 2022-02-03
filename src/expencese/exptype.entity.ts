/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expencese } from './expencese.entity';

@Entity()
export class Exptype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  mainId: number;

  @OneToMany(() => Expencese, (expencese) => expencese.exptype)
  Expenses: Expencese[];
}
