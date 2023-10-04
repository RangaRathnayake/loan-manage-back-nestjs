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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    // username: 'root',
    username: process.env.MYSQL_USER,
    // password: 'root',
    password: process.env.MYSQL_PASSWORD,
    // database: 'loan',
    database: process.env.MYSQL_DATABASE,
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
