import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // username: 'coopkhpm_luxi',
      password: 'root',
      // password: 'x&te2~}nfYMi',
      database: 'loanmange',
      // database: 'coopkhpm_luxe',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    InterestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
