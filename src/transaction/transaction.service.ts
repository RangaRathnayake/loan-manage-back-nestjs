/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, getConnection } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }

  async create(transaction) {
    return await this.transactionRepository.save(transaction);
  }

  async getOne(id) {
    return await this.transactionRepository.findOne(id, {
      relations: ['main'],
    });
  }

  async getByMain(id) {
    return await this.transactionRepository.find({ where: { main: id } });
  }

  async getall() {
    return await this.transactionRepository.find();
  }

  async getDesc() {
    return await this.transactionRepository.find({ order: { id: 'DESC' } });
  }

  async getRange(range) {
    return await this.transactionRepository.find({
      where: {
        day: Between(new Date(range.from), new Date(range.to)),
      },
      relations: ['main'],
    });
  }

  async getSattledRange(range) {
    try {
      const con = await getConnection();
      const data = await con.query(
        'SELECT `transaction`.id,`transaction`.mainId, MAX(`transaction`.`day`) AS day ,Sum(`transaction`.capital) AS capital,Sum(`transaction`.interest) AS interest,Sum(`transaction`.warant) AS warant,Sum(`transaction`.dockCharge) AS dockCharge,Sum(`transaction`.nonRefund) AS nonRefund,Sum(`transaction`.advance) AS advance,Sum(`transaction`.otherPay) AS otherPay,Sum(`transaction`.total) AS total,`transaction`.`status`,`transaction`.loanType,Sum(`transaction`.over) AS overp,Sum(`transaction`.arrears) AS arrears,`transaction`.expenceId,Sum(`transaction`.arrearsInterest) AS arrearsInterest,main.oderNumber FROM `transaction` INNER JOIN main ON `transaction`.mainId=main.id ' +
        ' WHERE `transaction`.`day` BETWEEN "2021-01-01" AND "2035-12-30" AND main.`status`=3 AND `transaction`.expenceId IS NULL AND `transaction`.loanType="' + range.type + '" GROUP BY `transaction`.mainId ORDER BY `transaction`.id DESC'
      );
      return data;
    } catch (error) {

    }
  }


  async getMonthlyTransactionReport(type) {
    try {
      const con = await getConnection();
      const data = await con.query(`SELECT YEAR ( day ) as year,
      MONTH ( day ) as month,
      Sum( transaction.capital ) + Sum( transaction.arrears ) AS capital,
      Sum( transaction.interest ) + Sum( transaction.arrearsInterest ) AS interest,
      Sum( transaction.warant ) AS warant,
      Sum( transaction.dockCharge ) AS dockCharge,
      Sum( transaction.nonRefund ) AS nonRefund,
      Sum( transaction.advance ) AS advance,
      Sum( transaction.otherPay ) AS otherPay,
      Sum( transaction.total ) AS total,
      Sum( transaction.over ) AS overPay 
    FROM
      transaction 
    WHERE
      transaction.status = 1 
      AND transaction.loanType = '`+ type + `'
    GROUP BY
      YEAR ( day ),
      MONTH ( day ) 
    ORDER BY
      transaction.day ASC`);
      return data;
    } catch (error) {

    }
  }

  async getIncome(range) {
    return await this.transactionRepository.find({
      where: {
        status: 1,
        loanType: range.type,
        day: Between(range.from, range.to),
      },
      relations: ['main'],
    });
  }
}
