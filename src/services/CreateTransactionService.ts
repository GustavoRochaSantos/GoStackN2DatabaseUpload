// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Params{ 
  title: string, 
  value: number, 
  type: string,
  category: string
}

class CreateTransactionService {
  public async execute({title, value, type, category}:Params): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository)
    const categoryRepository = getRepository(Category)

    if(type==='outcome'){
      const balance = await transactionRepository.getBalance()
      if((balance.total - value) < 0){
        throw new AppError('You have not cash', 400)
      }
    }

    let transactionCategory = await categoryRepository.findOne({where: { title:category }})

    if(!transactionCategory){
      transactionCategory = categoryRepository.create({title: category})
      await categoryRepository.save(transactionCategory)
    }

    const transaction = transactionRepository.create({
      title, 
      type, 
      value,
      category: transactionCategory
    })

    await transactionRepository.save(transaction)

    return transaction

  }
}

export default CreateTransactionService;
