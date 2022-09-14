/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { CustomerModule } from './customer/customer.module';
import { ProjectModule } from './project/project.module';
import { MainModule } from './main/main.module';
import { ExpenceseModule } from './expencese/expencese.module';
import { TransactionModule } from './transaction/transaction.module';
import { KeyvalModule } from './keyval/keyval.module';
import { ReceiptModule } from './receipt/receipt.module';
import { ArrearsModule } from './arrears/arrears.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // username: 'root',
      username: 'visiwxsf_loan',
      // password: 'root',
      password: '}[oY0yN$0R+S',
      // database: 'loan',
      database: 'visiwxsf_loan',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    InterestModule,
    CustomerModule,
    ProjectModule,
    MainModule,
    ExpenceseModule,
    TransactionModule,
    KeyvalModule,
    ReceiptModule,
    ArrearsModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
