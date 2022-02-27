/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Main } from './main.entity';
import { KeyvalService } from 'src/keyval/keyval.service';
import { Keyval } from 'src/keyval/keyval.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'src/transaction/transaction.entity';
import { ArrearsService } from 'src/arrears/arrears.service';
import { Arrears } from 'src/arrears/arrears.entity';
import { ExpenceseService } from 'src/expencese/expencese.service';
import { Expencese } from 'src/expencese/expencese.entity';
import { Exptype } from 'src/expencese/exptype.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Main,
      Keyval,
      Transaction,
      Arrears,
      Exptype,
      Expencese,
    ]),
  ],
  providers: [
    MainService,
    KeyvalService,
    TransactionService,
    ArrearsService,
    ExpenceseService,
  ],
  controllers: [MainController],
})
export class MainModule {}
