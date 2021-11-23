import { Body, Controller, Get, Post } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
    constructor(private interestService: InterestService) { }

    @Get()
    async get() {
        return await this.interestService.getAll();
    }

    @Post()
    async create(@Body('interest') interest) {
        return await this.interestService.create(interest);
    }

}
