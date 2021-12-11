import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arrears } from './arrears.entity';

@Injectable()
export class ArrearsService {
    constructor(
        @InjectRepository(Arrears) private readonly arrearsRepository: Repository<Arrears>
    ) { }

    async save(arrears) {
        return await this.arrearsRepository.save(arrears);
    }

    async getAllByMainId(id) {
        return await this.arrearsRepository.find({ where: { main: id } });
    }

    async getAllActiveByMainId(id) {
        return await this.arrearsRepository.find({ where: { main: id, status: 1 } });
    }

    async getAllActive() {
        return await this.arrearsRepository.find({ where: { status: 1 } });
    }


}
