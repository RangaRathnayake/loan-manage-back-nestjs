import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Arrears } from './arrears.entity';

@Injectable()
export class ArrearsService {
    constructor(
        @InjectRepository(Arrears) private readonly arrearsRepository: Repository<Arrears>
    ) { }

    async save(arrears) {
        return await this.arrearsRepository.save(arrears);
    }

    async update(arrearss) {
        arrearss.forEach(async element => {
            await this.arrearsRepository.save(element);
        });
        return { "Done": "ok" }
    }

    async getAllByMainId(id) {
        return await this.arrearsRepository.find({ where: { main: id } });
    }

    async getAllPendingByMainId(id) {
        return await this.arrearsRepository.find({ where: { main: id, status: Not(1) } });
    }

    async updateWarant(mid, warrant) {
        try {
            const ar = await this.arrearsRepository.findOne({ where: { main: mid, status: 2 } });
            if (ar) {
                ar.warrant = warrant;
                return await this.arrearsRepository.save(ar);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllActive() {
        return await this.arrearsRepository.find();
    }


    async getArrearsDate(mid) {
        try {
            return await this.arrearsRepository.findOne({ where: { main: mid, status: 2 } });
        } catch (error) {
            console.log(error);
            return error;
        }
    }





}
