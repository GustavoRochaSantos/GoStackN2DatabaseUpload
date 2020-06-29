import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Category from '../models/Category'

const categoryRoutes = Router()

categoryRoutes.get('/', async (request:Request, response:Response)=>{
  const categoryRepository = getRepository(Category)

  const categories = await categoryRepository.find()

  return response.json(categories)
})

categoryRoutes.post('/', async (request:Request, response:Response)=>{
  const { title } = request.body

  const categoryRepository = getRepository(Category)

  const category = categoryRepository.create({title})

  await categoryRepository.save(category)

  return response.json(category)
})

export default categoryRoutes