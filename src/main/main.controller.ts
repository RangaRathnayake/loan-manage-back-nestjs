/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private mainService: MainService) {}

  @Post('save')
  async create(@Body('main') main) {
    return await this.mainService.create(main);
  }

  @Get('max/:type')
  async getMax(@Param('type') type) {
    return await this.mainService.getMax(type);
  }

  @Get('get')
  async getAll() {
    return await this.mainService.getAll();
  }

  @Get('status/:status')
  async getAllByStatus(@Param('status') status) {
    return await this.mainService.getAllByStatus(status);
  }

  @Get('/withCus')
  async getAllWithCus() {
    return await this.mainService.getAllWithCus();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.mainService.getOne(id);
  }

  @Get('getByNumber/:number')
  async getByNumber(@Param('number') number) {
    return await this.mainService.getByNumber(number);
  }

  @Post('arrearsProcess')
  async arrearsProcess() {
    return this.mainService.arrearsProcess();
  }

  @Post('createArriarsList')
  async createArriarsList(@Body('main') main) {
    this.mainService.createArriarsList(main);
  }

  @Get('count/:id')
  async getDayCount(@Param('id') id) {
    return await this.mainService.getDayCount(id);
  }

  @Post('saveTransaction')
  async saveTransaction(@Body('transaction') transaction) {
    return await this.mainService.saveTransaction(transaction);
  }

  @Get('getTransaction/:id')
  async getTransaction(@Param('id') id) {
    return await this.mainService.getTransaction(id);
  }

  @Post('arrearsReport')
  async report() {
    return await this.mainService.arrearsReport();
  }

  @Post('loanByDateRange')
  async loanByDateRange(@Body('range') range) {
    return await this.mainService.loanByDateRange(range);
  }
}
