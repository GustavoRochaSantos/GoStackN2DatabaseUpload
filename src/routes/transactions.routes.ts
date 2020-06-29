import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';

import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload'
import multer from 'multer';

const upload = multer(uploadConfig)

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionRepository.find()

  const balance = await transactionRepository.getBalance()

  return response.json({transactions, balance})
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body

  const createTransactionService = new CreateTransactionService()

  const transaction = await createTransactionService.execute({
    title, category, type, value
  })

  return response.json(transaction)
});

transactionsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id.toString()
  
  const deleteTransactionService = new DeleteTransactionService()

  await deleteTransactionService.execute({id})

  return response.json({message: 'Transaction deleted.'})

});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {

  const filename = request.file.filename

  const importTransactionsService = new ImportTransactionsService()
  const transactions = await importTransactionsService.execute({filename})
  return response.json(transactions)
});

export default transactionsRouter;
