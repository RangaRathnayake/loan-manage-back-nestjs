import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './receipt.entity';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(Receipt) private readonly receiptRepository: Repository<Receipt>
    ) { }


    async create(receipt): Promise<Receipt> {
        return await this.receiptRepository.save(receipt);
    }

    async getAll(): Promise<Receipt[]> {
        return await this.receiptRepository.find();
    }

    async findOneById(id): Promise<Receipt> {
        return await this.receiptRepository.findOne(id);
    }

    async findOneByNumber(number): Promise<Receipt> {
        return await this.receiptRepository.findOne({ where: { number: number } });
    }

    async getMax(type) {
        const query = this.receiptRepository.createQueryBuilder("Receipt");
        query.where("type=:type", { type: type });
        query.select("MAX(oderNumber)", "max");
        return query.getRawOne();
    }


}
