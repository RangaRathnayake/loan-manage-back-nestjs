import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>
    ) { }


    async create(transaction) {
        return await this.transactionRepository.save(transaction);
    }

    async getOne(id) {
        return await this.transactionRepository.findOne(id, { relations: ['main'] });
    }

    async getByMain(id) {
        return await this.transactionRepository.find({ where: { main: id } })
    }

    async getall() {
        return await this.transactionRepository.find()
    }

    async getDesc() {
        return await this.transactionRepository.find({ order: { id: 'DESC' } });
    }

    async getRange(range) {
        return await this.transactionRepository.find(
            {
                where: {
                    day: Between(range.from, range.to)
                }
            }
        )
    }




}
