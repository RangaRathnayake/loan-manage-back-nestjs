import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Main } from './main.entity';
import { KeyvalService } from 'src/keyval/keyval.service';
import { Keyval } from 'src/keyval/keyval.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Main, Keyval])
  ],
  providers: [MainService, KeyvalService],
  controllers: [MainController]
})
export class MainModule { }
