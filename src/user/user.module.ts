import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Utype } from './utype.entity';
import { Privilage } from './privilage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Utype, Privilage]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
