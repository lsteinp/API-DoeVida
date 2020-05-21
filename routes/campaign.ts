import express, { Request, Response } from 'express'
import ResponseHelper from '../Helpers/ResponseHelper'
import CampaignController from '../Controllers/CampaignController'
import { validatorMiddleware } from '../Middleware/validatorMiddleware'
import { campaignSchema, fetchCampaignsByUserIdSchema, fetchCampaignsByIdSchema, fetchCampaign } from '../Middleware/Schemas/Campaign'

const routerCampaign = express.Router()

const campaignController = new CampaignController()

routerCampaign.get('/', validatorMiddleware(fetchCampaign), async (req: Request, res: Response) => {
  const { errorObj, data } = await campaignController.fetchCampaigns(req.query)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

routerCampaign.post('/', validatorMiddleware(campaignSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await campaignController.addCampaign(req.body)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

routerCampaign.get('/myCampaigns/:userID', validatorMiddleware(fetchCampaignsByUserIdSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await campaignController.fetchByUser(req.params.userID)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

routerCampaign.get('/:campaignId', validatorMiddleware(fetchCampaignsByIdSchema), async (req: Request, res: Response) => {
  const { errorObj, data } = await campaignController.fetchByCampaignId(req.params.campaignId)
  res.json(ResponseHelper.createResponse(errorObj, data))
})

export default routerCampaign