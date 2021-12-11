import { Module } from '@nestjs/common';
import { ArrearsService } from './arrears.service';
import { ArrearsController } from './arrears.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arrears } from './arrears.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arrears])],
  providers: [ArrearsService],
  controllers: [ArrearsController]
})
export class ArrearsModule { }
