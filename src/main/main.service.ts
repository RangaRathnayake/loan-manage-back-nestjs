/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrearsService } from 'src/arrears/arrears.service';
import { KeyvalService } from 'src/keyval/keyval.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { Between, getConnection, Repository } from 'typeorm';
import { Main } from './main.entity';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { type } from 'os';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Main) private readonly mainRepository: Repository<Main>,
    private keyvalService: KeyvalService,
    private transactionService: TransactionService,
    private arrearsService: ArrearsService,
  ) {}

  async create(main): Promise<Main> {
    return await this.mainRepository.save(main);
  }

  async getOne(id): Promise<Main> {
    return await this.mainRepository.findOne(id, { relations: ['customer'] });
  }

  async getByNumber(number): Promise<Main[]> {
    return await this.mainRepository.find({
      where: { oderNumber: number },
      relations: ['customer'],
    });
  }

  async getAll(): Promise<Main[]> {
    return await this.mainRepository.find();
  }

  async getAllByStatus(status): Promise<Main[]> {
    return await this.mainRepository.find({
      where: { status: status },
      relations: ['customer'],
    });
  }

  async getAllApprove(): Promise<Main[]> {
    return await this.mainRepository.find({
      where: { status: 1 },
      relations: ['arrearss'],
    });
  }

  async getAllWithCus(): Promise<any[]> {
    return await this.mainRepository.find({ relations: ['customer'] });
  }

  async getAllWithCusByType(type: string): Promise<any[]> {
    return await this.mainRepository.find({
      where: { loanType: type },
      relations: ['customer'],
    });
  }

  async getMax(type) {
    const query = this.mainRepository.createQueryBuilder('Main');
    query.where('loanType=:loanType', { loanType: type });
    query.select('MAX(oderNumberInt)', 'max');
    return query.getRawOne();
  }

  async arrearsProcess() {
    console.log('process start');
    const val = await this.keyvalService.getByKey('warrant_day');
    const wr = await this.keyvalService.getByKey('warrant_rate');
    const todate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
    });

    const today = new Date(todate);

    const list = await this.getAllApprove();
    const mainI = 0;
    // console.log(list);

    list.forEach((mainObj) => {
      let dateBegin = null;
      let expCount = 0;
      let totalArrears = 0;
      let totalWarrant = 0;
      let fullWarrant = 0;

      if (mainI != list.length) {
        const arre: any = mainObj.arrearss;

        for (let i = 0; i < arre.length; i++) {
          const arrears = mainObj.arrearss[i];

          if (arrears.status != 1) {
            const payDate = new Date(arrears.payDate);

            payDate.setDate(payDate.getDate() + parseInt(val.val));

            if (today > payDate) {
              const expDayCount = Math.ceil(
                (today.getTime() - payDate.getTime()) / (1000 * 60 * 60 * 24),
              );

              if (arrears.status == 0) {
                const capital = arrears.capital;

                const interest = arrears.interest;

                arrears.capitalArrears = capital;

                arrears.interestArrears = interest;

                arrears.capital = 0;

                arrears.interest = 0;

                arrears.status = 2;
              }
              // if (mainObj.id == 1) {
              if (arrears.status == 2) {
                expCount = expDayCount;
                if (!dateBegin) {
                  dateBegin = payDate;
                }

                totalArrears +=
                  Number(arrears.capitalArrears) +
                  Number(arrears.interestArrears);
                // console.log('---------------------------');

                const mm = expDayCount / 30;
                if (mm < 1) {
                  // console.log(expDayCount);
                  // console.log('Masekata adui');
                  totalWarrant =
                    ((Number(totalArrears) * Number(wr.val)) / 100 / 30) *
                    expDayCount;
                  // console.log(totalWarrant);
                } else {
                  // console.log('Month 30');
                  totalWarrant =
                    ((Number(totalArrears) * Number(wr.val)) / 100 / 30) * 30;
                  // console.log(totalWarrant);
                }

                fullWarrant += totalWarrant;

                // console.log('Full :   ' + fullWarrant);
                // console.log('---------------------------');
              }
              this.arrearsService.save(arrears);
              // }
            }
          }
        }

        // );

        this.arrearsService.updateWarant(mainObj.id, fullWarrant);
      }
    });

    console.log('process end');
    return { status: 'OK' };
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
        status: 0,
      };
      await this.arrearsService.save(arrears);
    }
  }

  async getDayCount(id) {
    try {
      const val = await this.keyvalService.getByKey('warrant_day');
      const todate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Colombo',
      });
      var today = new Date(todate);
      const arrears = await this.arrearsService.getArrearsDate(id);
      if (arrears) {
        var payDate = new Date(arrears.payDate);
        payDate.setDate(payDate.getDate() + parseInt(val.val));
        const expDayCount = Math.ceil(
          (today.getTime() - payDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        // console.log(expDayCount);
        return { count: expDayCount };
      } else {
        return { count: 0 };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveTransaction(transaction) {
    const trans = await this.transactionService.create(transaction);
    const main = await this.getOne(transaction.main);
    return { transaction: trans, main: main };
  }

  async getTransaction(id) {
    const trans = await this.transactionService.getOne(id);
    const main = await this.getOne(trans.main);
    return { transaction: trans, main: main };
  }

  async arrearsReport() {
    try {
      const approved = await await this.mainRepository.find({
        where: { status: 1 },
        relations: ['arrearss', 'customer'],
      });
      // console.log(approved);

      let arr = [];

      await approved.forEach(async (m) => {
        let obj = {
          mid: m.id,
          loanNumber: m.oderNumber,
          customer: m.customer.name,
          nic: m.customer.nic,
          mobile: m.customer.mobile,
          type: m.loanType,
          loanAmount: m.totalLoanAmount,
          monthsCount: m.monthsCount,
          interestRate: m.interestRate,
          capitalPerMonth: m.capitalPerMonth,
          interestPerMonth: m.interestPerMonth,
          totalPerMonth: m.totalPerMonth,
          arrearsCapital: 0,
          arrearsInterest: 0,
          warrant: 0,
          count: 0,
          full_total: 0,
          total_arrears: 0,
        };
        let count = 0;
        await m.arrearss.forEach((a) => {
          if (a.status === 2) {
            count++;
            obj.arrearsCapital += Number(a.capitalArrears);
            obj.arrearsInterest += Number(a.interestArrears);
            obj.warrant += Number(a.warrant);
            obj.count = count;
            obj.full_total +=
              Number(a.capitalArrears) +
              Number(a.interestArrears) +
              Number(a.warrant);
            obj.total_arrears +=
              Number(a.capitalArrears) + Number(a.interestArrears);
          }
        });

        arr.push(obj);
      });

      const rarr = arr.filter((aa) => {
        if (aa.total_arrears > 0) {
          return aa;
        }
      });

      return rarr;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async loanByDateRange(range) {
    try {
      return await this.mainRepository.find({
        where: { startDate: Between(range.from, range.to) },
        relations: ['customer'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findExpenceseWithLone(type) {
    console.log(type);
    try {
      const main = await this.mainRepository.find({
        relations: ['expenceses'],
        where: { loanType: type },
      });
      return main;
    } catch (error) {
      console.log(error);
    }
  }

  async mairReport() {
    try {
      const con = await getConnection();
      const data = await con.query(
        'SELECT arrears.mainId,Sum(arrears.capital) as TC,Sum(arrears.interest) as TI ,Sum(arrears.capitalPaid) as TPC,Sum(arrears.interestPaid) as TPI ,Sum(arrears.capitalArrears) as TCA,Sum(arrears.interestArrears) as TIA ,Sum(arrears.warrant) as TWA ,Sum(arrears.warrantPaid) as TPW ,main.loanType,main.oderNumber,main.loanAmount,main.dockCharge,main.totalLoanAmount,main.monthsCount,main.interestRate,main.interestRateId,main.startDate,main.capitalPerMonth,main.interestPerMonth,main.totalPerMonth,main.NonRefundableAdvance,main.downPayment,main.projectId,main.projectName,main.blockNumber,main.propertyName,main.propertyCode,main.`status`,main.customerId,main.oderNumberInt,main.monthlyPayDate,main.`value`,main.discount,main.sellingPrice,main.finaladvance,main.ep,main.perches FROM arrears RIGHT JOIN main ON arrears.mainId=main.id  WHERE main.loanType="L"  GROUP BY arrears.mainId',
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
