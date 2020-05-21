import express, { Request, Response } from 'express'
import ResponseHelper from '../Helpers/ResponseHelper'
import UserController from '../Controllers/UserController'
import { validatorMiddleware } from '../Middleware/validatorMiddleware'
import { fetchUserSchema, fetchUserByEmailSchema } from '../Middleware/Schemas/User'

const routerUsers = express.Router()

const userController = new UserController()

//Fetch Routes
routerUsers.get('/', async (req: Request, res: Response) => {
  const { errorObj, data } = await userController.fetchUsers(req.query)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

//Find Routes
routerUsers.get('/:id', validatorMiddleware(fetchUserSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await userController.findUser(req.params.id)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

routerUsers.get('/email/:email', validatorMiddleware(fetchUserByEmailSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await userController.findUserByEmail(req.params.email)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

//Update Routes
routerUsers.put('/', validatorMiddleware(fetchUserSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await userController.updateUser(req.body)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

//Delete Routes
routerUsers.delete('/:id', validatorMiddleware(fetchUserSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await userController.deleteUser(req.params.id)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

export default routerUsers