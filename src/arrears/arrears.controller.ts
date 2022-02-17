/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { timeStamp } from 'console';
import { ArrearsService } from './arrears.service';

@Controller('arrears')
export class ArrearsController {
  constructor(private arrearsService: ArrearsService) {}

  @Post('save')
  async save(@Body('arrears') arrears) {
    return await this.arrearsService.save(arrears);
  }

  @Post('update')
  async update(@Body('arrearss') arrearss) {
    return await this.arrearsService.save(arrearss);
  }

  @Get('get')
  async getAllActive() {
    return await this.arrearsService.getAllActive();
  }

  @Get('main/:id')
  async getAllActiveByMain(@Param('id') id) {
    return await this.arrearsService.getAllByMainId(id);
  }

  @Get('pending/:id')
  async getAllPendingByMain(@Param('id') id) {
    return await this.arrearsService.getAllPendingByMainId(id);
  }

  @Get('allmain/id')
  async getAllByMain(@Param('id') id) {
    return await this.arrearsService.getAllByMainId(id);
  }

  @Post('updateWarant')
  async updateWarant(@Body('values') values) {
    return await this.arrearsService.updateWarant(values.mid, values.warrant);
  }

  @Post('updateInterest')
  async updateInterest(@Body('values') values) {
    return await this.arrearsService.updateInterest(values.mid, values.newval);
  }
}
