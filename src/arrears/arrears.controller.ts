import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { timeStamp } from 'console';
import { ArrearsService } from './arrears.service';

@Controller('arrears')
export class ArrearsController {
    constructor(
        private arrearsService: ArrearsService
    ) { }

    @Post()
    async save(@Body('arrears') arrears) {
        return await this.arrearsService.save(arrears)
    }

    @Get()
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



}
