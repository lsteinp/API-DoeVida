import Joi from '@hapi/joi'

const address = Joi.object().keys({
  street: Joi.string()
  .required(),
  number: Joi.number()
  .required(),
  complement: Joi.string(),
  district: Joi.string()
  .required(),
  city: Joi.string()
  .required(),
  state: Joi.string()
  .required(),
  country: Joi.string()
  .required(),
})

export const donationEntitychema = Joi.object({
  body: {
    address: address,
    name: Joi.string()
        .required()
  }
})

export const fetchDonationEntityByAddressId = Joi.object({
  parms: {
    addressId: Joi.string()
        .valid(address)
  }
})