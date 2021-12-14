import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KeyvalService } from './keyval.service';

@Controller('keyval')
export class KeyvalController {
    constructor(private keyvalService: KeyvalService) { }

    @Post('save')
    async create(@Body('keyval') keyval) {
        return await this.keyvalService.create(keyval);
    }

    @Get('get')
    async getAll() {
        return await this.keyvalService.getAll();
    }

    @Get(':key')
    async getByKey(@Param('key') key) {
        return await this.keyvalService.getByKey(key);
    }
}
