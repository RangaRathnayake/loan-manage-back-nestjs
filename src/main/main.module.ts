import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Main } from './main.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Main])
  ],
  providers: [MainService],
  controllers: [MainController]
})
export class MainModule { }
