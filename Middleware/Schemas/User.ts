import Joi from '@hapi/joi'

export const loginSchema = Joi.object({
  body: {
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    token: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
  }
})

export const fetchUserSchema = Joi.object({
  parms: {
    id: Joi.string()
  }
})

export const fetchUserByEmailSchema = Joi.object({
  parms: {
    email: Joi.string().
        email()
  }
})
