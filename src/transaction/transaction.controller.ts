import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private transactonService: TransactionService) { }

    @Post()
    async create(@Body('transaction') transaction) {
        return await this.transactonService.create(transaction);
    }

    @Get('main/:id')
    async getByMain(@Param('id') id) {
        return await this.transactonService.getByMain(id)
    }

}
