import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
    constructor(private interestService: InterestService) { }

    @Get()
    async get() {
        return await this.interestService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id) {
        return await this.interestService.findById(id);
    }

    @Post()
    async create(@Body('interest') interest) {
        return await this.interestService.create(interest);
    }

}
