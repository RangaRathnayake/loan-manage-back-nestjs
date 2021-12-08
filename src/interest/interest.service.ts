import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './interest.entity';

@Injectable()
export class InterestService {
    constructor(@InjectRepository(Interest) private readonly interestRepository: Repository<Interest>) { }

    async getAll(): Promise<Interest[]> {
        return await this.interestRepository.find();
    }

    async findById(id): Promise<Interest> {
        return await this.interestRepository.findOne({ id })
    }

    async create(interest): Promise<Interest> {
        return await this.interestRepository.save(interest);
    }

}
