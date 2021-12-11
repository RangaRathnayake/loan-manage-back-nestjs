import { Module } from '@nestjs/common';
import { KeyvalService } from './keyval.service';
import { KeyvalController } from './keyval.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyval } from './keyval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyval])],
  providers: [KeyvalService],
  controllers: [KeyvalController]
})
export class KeyvalModule { }
