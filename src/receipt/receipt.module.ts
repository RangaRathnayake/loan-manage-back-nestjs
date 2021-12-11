import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptService],
  controllers: [ReceiptController]
})
export class ReceiptModule { }
