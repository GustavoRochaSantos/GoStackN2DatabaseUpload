import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> { 
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const balance = transactions.reduce((total, item)=>{
      if(item.type ==='income')
        total.income += Number(item.value)
      else
        total.outcome += Number(item.value)
    
      total.total = total.income - total.outcome

      return total
    }, {income:0, outcome:0, total:0})

    return balance

  }
}

export default TransactionsRepository;
