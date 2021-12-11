import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReceiptService } from './receipt.service';

@Controller('receipt')
export class ReceiptController {
    constructor(
        private receiptService: ReceiptService
    ) { }

    @Post()
    async create(@Body('receipt') receipt) {
        return await this.receiptService.create(receipt);
    }

    @Get()
    async getAll() {
        return await this.receiptService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id) {
        return await this.receiptService.findOneById(id);
    }

    @Get('number/:number')
    async getByNumber(@Param('number') number) {
        return await this.receiptService.findOneByNumber(number);
    }

    @Get('max/:type')
    async getMax(@Param('type') type) {
        return await this.receiptService.getMax(type);
    }


}
