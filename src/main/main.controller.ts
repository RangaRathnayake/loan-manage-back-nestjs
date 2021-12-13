import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
    constructor(private mainService: MainService) { }

    @Post()
    async create(@Body('main') main) {
        return await this.mainService.create(main);
    }

    @Get('max/:type')
    async getMax(@Param('type') type) {
        return await this.mainService.getMax(type);
    }

    @Get()
    async getAll() {
        return await this.mainService.getAll();
    }

    @Get('/withCus')
    async getAllWithCus() {
        return await this.mainService.getAllWithCus();
    }

    @Get(':id')
    async getOne(@Param('id') id) {
        return await this.mainService.getOne(id);
    }

    
    @Post('arrearsProcess')
    async arrearsProcess() {
        return this.mainService.arrearsProcess();
    }

    @Post('createArriarsList')
    async createArriarsList(@Body('main') main) {
        this.mainService.createArriarsList(main)
    }


}
