/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactonService: TransactionService) { }

  @Post('save')
  async create(@Body('transaction') transaction) {
    return await this.transactonService.create(transaction);
  }

  @Get('main/:id')
  async getByMain(@Param('id') id) {
    return await this.transactonService.getByMain(id);
  }

  @Get('get')
  async getall() {
    return await this.transactonService.getall();
  }

  @Get('getDesc')
  async getDesc() {
    return await this.transactonService.getDesc();
  }

  @Post('getRange')
  async getRange(@Body('range') range) {
    return await this.transactonService.getRange(range);
  }

  @Post('getSattledRange')
  async getSattledRange(@Body('range') range) {
    return await this.transactonService.getSattledRange(range);
  }

  @Post('getIncome')
  async getIncome(@Body('range') range) {
    return await this.transactonService.getIncome(range);
  }

  @Post('monthlyTransactionReport')
  async monthlyTransactionReport(@Body('range') range) {
    return await this.transactonService.getMonthlyTransactionReport(range.type);
  }

}
