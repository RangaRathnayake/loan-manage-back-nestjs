import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private readonly reportRepo: Repository<Report>) { }

    async createReport(report) {
        return await this.reportRepo.save(report);
    }

    async getByType(type) {
        return await this.reportRepo.find({ where: { type: type }, order: { year: 'ASC', month: 'ASC' } });
    }

    async findOne(id) {
        return await this.reportRepo.findOne(id);
    }

    async find(data) {
        console.log(data.type);
        return await this.reportRepo.findOne({ where: { type: data.type, year: data.year, month: data.month } });
    }

}
