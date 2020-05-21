import express, { Request, Response } from 'express'
import ResponseHelper from '../Helpers/ResponseHelper'
import DonationEntityController from '../Controllers/DonationEntityController'
import { donationEntitychema, fetchDonationEntityByAddressId } from '../Middleware/Schemas/donationEntity'
import { validatorMiddleware } from '../Middleware/validatorMiddleware'

const routerDonationEntity = express.Router()

const donationEntityController = new DonationEntityController()

routerDonationEntity.get('/:addressId?', validatorMiddleware(fetchDonationEntityByAddressId), async (req: Request, res: Response) => {
  const { addressId } = req.params
  const { errorObj, data } = await donationEntityController.fetchDonationEntities(addressId)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

routerDonationEntity.post('/', validatorMiddleware(donationEntitychema), async (req: Request, res: Response) => {
  const { errorObj, data } = await donationEntityController.addDonationEntities(req.body)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

export default routerDonationEntity