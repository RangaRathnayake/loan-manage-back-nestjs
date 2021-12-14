import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyval } from './keyval.entity';

@Injectable()
export class KeyvalService {
    constructor(
        @InjectRepository(Keyval) private readonly keyvalRepository: Repository<Keyval>
    ) { }


    async create(keyval): Promise<Keyval> {
        return await this.keyvalRepository.save(keyval);
    }

    async getAll(): Promise<Keyval[]> {     
        return await this.keyvalRepository.find();
    }

    async getByKey(key): Promise<Keyval> {
        return await this.keyvalRepository.findOne({ where: { key: key } });
    }

}
