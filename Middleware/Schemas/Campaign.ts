import Joi from '@hapi/joi'
import { BloodType } from '../../models/campaign'

export const campaignSchema = Joi.object({
  body: {
    userId: Joi.string()
        .required(),
    donationEntityId: Joi.string()
        .required(),
    receiverName: Joi.string()
        .required(),
    bloodType: Joi.string()
        .valid(BloodType.AB_NEGATIVE, BloodType.AB_POSITIVE, BloodType.A_NEGATIVE, BloodType.A_POSITIVE, BloodType.B_NEGATIVE, BloodType.B_POSITIVE, BloodType.O_NEGATIVE, BloodType.O_POSITIVE, BloodType.T_ALL)
        .required()
  }
})

export const fetchCampaignsByUserIdSchema = Joi.object({
  parms: {
    userId: Joi.string()
        .required()
  }
})

export const fetchCampaignsByIdSchema = Joi.object({
  parms: {
    id: Joi.string()
        .required()
  }
})

export const fetchCampaign = Joi.object({
  query: {
    donationEntityId: Joi.string()
  }
})