import { getRepository } from "typeorm";
import Transaction from "../models/Transaction";
import AppError from "../errors/AppError";

interface Params {
  id: string
}

class DeleteTransactionService {
  public async execute({id}:Params): Promise<void> {
  
    const transactionRepository = getRepository(Transaction)

    const transactionExists = await transactionRepository.findOne(id)
  
    if(!transactionExists)
      throw new AppError('Transaction dont exist.')
  
    await transactionRepository.delete({id})

  }
}

export default DeleteTransactionService;
