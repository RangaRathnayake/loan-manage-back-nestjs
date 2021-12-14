import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpenceseService } from './expencese.service';

@Controller('expencese')
export class ExpenceseController {
    constructor(
        private expenceseService: ExpenceseService
    ) { }

    @Get('/type')
    async getAllExType() {
        return await this.expenceseService.getAllExType();
    }

    @Get('/type/:id')
    async findOneExType(@Param('id') id) {
        return await this.expenceseService.findOneExType(id);
    }

    @Post('/type')
    async createExType(@Body('extype') extype) {
        return await this.expenceseService.createExType(extype);
    }

    @Get('get')
    async getAllExpencese() {
        return await this.expenceseService.getAllExpencese();
    }

    @Get(':id')
    async findOneExpencese(@Param('id') id) {
        return await this.expenceseService.findOneExpencese(id);
    }

    @Post('save')
    async createExpencese(@Body('expences') expences) {
        return await this.expenceseService.createExpencese(expences);
    }



}
