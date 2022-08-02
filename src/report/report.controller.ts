import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) { }


    @Post('create')
    async create(@Body('body') body) {
        return await this.reportService.createReport(body);
    }

    @Post('byType')
    async getByType(@Body('range') range) {
        return await this.reportService.getByType(range.type);
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id) {
        return await this.reportService.findOne(id);
    }

    @Post('find')
    async find(@Body('body') body) {
        console.log(body);
        return await this.reportService.find(body.data);
    }


}
