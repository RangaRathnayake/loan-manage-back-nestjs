import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>
    ) { }


    async create(transaction) {
        return await this.transactionRepository.save(transaction);
    }


    async getByMain(id) {
        return await this.transactionRepository.find({ where: { main: id } })
    }




}
