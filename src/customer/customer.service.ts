import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>
    ) { }

    async create(customer): Promise<Customer> {
        return await this.customerRepository.save(customer);
    }

    async getOne(id): Promise<Customer> {
        return await this.customerRepository.findOne(id);
    }

    async getAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }

   

}
