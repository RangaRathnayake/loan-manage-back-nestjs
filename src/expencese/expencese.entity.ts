/* eslint-disable prettier/prettier */
import { Main } from 'src/main/main.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exptype } from './exptype.entity';

@Entity()
export class Expencese {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  loanNumber: string;
  @Column({ nullable: true })
  day: string;
  @Column({ nullable: true })
  to: string;
  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount: number;
  @Column({ nullable: true })
  status: number;
  @ManyToOne(() => Exptype, (exptype) => exptype.Expenses)
  exptype: Exptype;
  @ManyToOne(() => Main, (main) => main.expenceses)
  main: Main;
}
