import Transaction from '../models/Transaction';
import path from 'path'
import uploadConfig from '../config/upload'
import fs from 'fs'
import csv from 'csvtojson'
import CreateTransactionService from './CreateTransactionService';
import transactionsRouter from '../routes/transactions.routes';

interface Params {
  filename: string
}

interface CSVParam{ 
  title:string ,
  value: number, 
  type: string, 
  category: string
}

class ImportTransactionsService {


  async execute({filename}:Params): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService()
    const csvFilePath = path.join(uploadConfig.directory, filename)

    const csvJson = await csv().fromFile(csvFilePath)

    await fs.promises.unlink(csvFilePath)

    const transactions: Transaction[] = []

    for(const item of csvJson){
      const {title, type, value, category } = item
      
      const transaction = await createTransactionService.execute({
        title, type, value, category
      })

      transactions.push(transaction)
    }

    return transactions
  }
}

export default ImportTransactionsService;
