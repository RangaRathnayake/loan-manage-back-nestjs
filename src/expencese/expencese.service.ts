/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Expencese } from './expencese.entity';
import { Exptype } from './exptype.entity';

@Injectable()
export class ExpenceseService {
  constructor(
    @InjectRepository(Exptype)
    private readonly extypeRepository: Repository<Exptype>,
    @InjectRepository(Expencese)
    private readonly expenceseRepository: Repository<Expencese>,
  ) {}

  async getAllExType() {
    return await this.extypeRepository.find();
  }

  async createExType(exType) {
    return await this.extypeRepository.save(exType);
  }

  async findOneExType(id) {
    return await this.extypeRepository.findOne(id);
  }

  async getAllExpencese() {
    return await this.expenceseRepository.find();
  }

  async getByDateRange(range) {
    return await this.expenceseRepository.find({
      where: { day: Between(range.from, range.to) },
      relations: ['exptype'],
    });
  }

  async createExpencese(expencese) {
    return await this.expenceseRepository.save(expencese);
  }

  async findOneExpencese(id) {
    return await this.expenceseRepository.findOne(id);
  }
}
