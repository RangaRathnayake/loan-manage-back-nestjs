import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max } from 'class-validator';
import { ArrearsService } from 'src/arrears/arrears.service';
import { KeyvalService } from 'src/keyval/keyval.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { Repository } from 'typeorm';
import { Main } from './main.entity';

@Injectable()
export class MainService {
    constructor(
        @InjectRepository(Main) private readonly mainRepository: Repository<Main>,
        private keyvalService: KeyvalService,
        private transactionService: TransactionService,
        private arrearsService: ArrearsService
    ) { }

    async create(main): Promise<Main> {
        return await this.mainRepository.save(main);
    }

    async getOne(id): Promise<Main> {
        return await this.mainRepository.findOne(id, { relations: ["customer"] });
    }

    async getAll(): Promise<Main[]> {
        return await this.mainRepository.find();
    }

    async getAllByStatus(status): Promise<Main[]> {
        return await this.mainRepository.find({ where: { status: status } });
    }

    async getAllApprove(): Promise<Main[]> {
        return await this.mainRepository.find({ where: { status: 1 }, relations: ["arrearss"] })
    }

    async getAllWithCus(): Promise<any[]> {
        return await this.mainRepository.find({ relations: ["customer"] });
    }

    async getMax(type) {
        const query = this.mainRepository.createQueryBuilder("Main");
        query.where("loanType=:loanType", { loanType: type });
        query.select("MAX(oderNumberInt)", "max");
        return query.getRawOne();
    }



    async arrearsProcess() {
        console.log(
            "process start"
        );
        const val = await this.keyvalService.getByKey("warrant_day");
        const wr = await this.keyvalService.getByKey("warrant_rate");
        const todate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
        var today = new Date(todate);

        const list = await this.getAllApprove();
        var mainI = 0;
        // console.log(list);

        list.forEach(mainObj => {
            if (mainI != list.length) {
                mainObj.arrearss.forEach(async arrears => {
                    if (arrears.status != 1) {
                        var payDate = new Date(arrears.payDate);
                        payDate.setDate(payDate.getDate() + parseInt(val.val));
                        if (today > payDate) {
                            const expDayCount = Math.ceil((today.getTime() - payDate.getTime()) / (1000 * 60 * 60 * 24));
                            console.log(expDayCount);

                            if (arrears.status == 2) {
                                var warrant = ((Number(arrears.capitalArrears) + Number(arrears.interestArrears)) * Number(wr.val) / 100) * expDayCount;
                                arrears.warrant = warrant;
                            }

                            if (arrears.status == 0) {
                                var capital = arrears.capital;
                                var interest = arrears.interest;
                                arrears.capitalArrears = capital;
                                arrears.interestArrears = interest;
                                arrears.capital = 0;
                                arrears.interest = 0;
                                var warrant = ((Number(capital) + Number(interest)) * Number(wr.val) / 100) * expDayCount;
                                arrears.warrant = warrant;
                                arrears.status = 2;
                            }

                            await this.arrearsService.save(arrears);

                        }
                    }
                });
            }
        })

        console.log("process end");
        return { status: "OK" };
    }

    async createArriarsList(main) {
        var installment = main.monthsCount;
        var nextDate = new Date(main.startDate);
        var i = 1;
        for (i = 1; i <= installment; i++) {
            nextDate.setMonth(nextDate.getMonth() + 1);
            var arrears = {
                payDate: nextDate,
                installment: i,
                capital: main.capitalPerMonth,
                interest: main.interestPerMonth,
                main: main.id,
                status: 0
            }
            await this.arrearsService.save(arrears);
        }
    }


}




