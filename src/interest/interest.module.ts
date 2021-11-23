import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestController } from './interest.controller';
import { Interest } from './interest.entity';
import { InterestService } from './interest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interest])
  ],
  controllers: [InterestController],
  providers: [InterestService]
})
export class InterestModule { }
