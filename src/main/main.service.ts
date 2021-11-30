import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max } from 'class-validator';
import { Repository } from 'typeorm';
import { Main } from './main.entity';

@Injectable()
export class MainService {
    constructor(
        @InjectRepository(Main) private readonly mainRepository: Repository<Main>
    ) { }

    async create(main): Promise<Main> {
        return await this.mainRepository.save(main);
    }

    async getOne(id): Promise<Main> {
        return await this.mainRepository.findOne(id);
    }

    async getAll(): Promise<Main[]> {
        return await this.mainRepository.find();
    }

    async getMax(type) {
        const query = this.mainRepository.createQueryBuilder("Main");       
        query.where("loanType=:loanType", { loanType: type });
        query.select("MAX(oderNumberInt)", "max");
        return query.getRawOne();       
    }
}
