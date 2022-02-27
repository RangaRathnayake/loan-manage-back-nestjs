/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExpenceseService } from './expencese.service';
import { ExpenceseController } from './expencese.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expencese } from './expencese.entity';
import { Exptype } from './exptype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expencese, Exptype])],
  providers: [ExpenceseService],
  controllers: [ExpenceseController],
})
export class ExpenceseModule {}
