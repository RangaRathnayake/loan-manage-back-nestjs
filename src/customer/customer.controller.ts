import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Post()
    async create(@Body('customer') customer) {
        return await this.customerService.create(customer);
    }

    @Get()
    async getAll() {
        return await this.customerService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id) {
        return await this.customerService.getOne(id);
    }

}
