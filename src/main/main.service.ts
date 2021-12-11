import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max } from 'class-validator';
import { KeyvalService } from 'src/keyval/keyval.service';
import { Repository } from 'typeorm';
import { Main } from './main.entity';

@Injectable()
export class MainService {
    constructor(
        @InjectRepository(Main) private readonly mainRepository: Repository<Main>,
        private keyvalService: KeyvalService,
    ) { }

    async create(main): Promise<Main> {
        return await this.mainRepository.save(main);
    }

    async getOne(id): Promise<Main> {
        return await this.mainRepository.findOne(id, { relations: ["customer"] });
    }

    async getAll(): Promise<Main[]> {
        return await this.mainRepository.find();
    }

    async getAllWithCus(): Promise<any[]> {
        return await this.mainRepository.find({ relations: ["customer"] });
    }

    async getMax(type) {
        const query = this.mainRepository.createQueryBuilder("Main");
        query.where("loanType=:loanType", { loanType: type });
        query.select("MAX(oderNumberInt)", "max");
        return query.getRawOne();
    }

    async getWarrantDate(id) {
        const main = await this.mainRepository.findOne(id);
        const val = await this.keyvalService.getByKey("warrant_day");
        const todate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
        var today = new Date(todate);
        var day = new Date(main.startDate);
        var expDay = new Date(main.startDate);     
        expDay.setDate(expDay.getDate() + parseInt(val.val))  
        var expDayCount = 0;
        var isExpired = false;
        if (today > expDay) {
            isExpired = true;
            expDayCount = Math.ceil((today.getTime() - expDay.getTime()) / (1000 * 60 * 60 * 24));           
        }
        return { day: day, expDay: expDay, today: today, isExpired: isExpired, expDayCount: expDayCount };
    }


}
