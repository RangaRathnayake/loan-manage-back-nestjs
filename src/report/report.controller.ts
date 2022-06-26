import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) { }


    @Post('create')
    async create(@Body('body') body) {
        return await this.reportService.createReport(body);
    }

    @Get('byType/:type')
    async getByType(@Param('type') type) {
        return await this.reportService.getByType(type);
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id) {
        return await this.reportService.findOne(id);
    }


}
