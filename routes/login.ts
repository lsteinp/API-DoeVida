import express, { Request, Response } from 'express'
import ResponseHelper from '../Helpers/ResponseHelper'
import LoginController from '../Controllers/LoginController'
import { validatorMiddleware } from '../Middleware/validatorMiddleware'
import { loginSchema } from '../Middleware/Schemas/User'

const routerLogin = express.Router()

const loginController = new LoginController()

routerLogin.post('/', validatorMiddleware(loginSchema), async (req: Request, res: Response) => {
  const { token, email, name } = req.body
  const { errorObj, data } = await loginController.login(token, email, name)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

export default routerLogin