import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
    constructor(private mainService: MainService) { }

    @Post()
    async create(@Body('main') main) {
        return await this.mainService.create(main);
    }

    @Get()
    async getAll() {
        return await this.mainService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id) {
        return await this.mainService.getOne(id);
    }

}
