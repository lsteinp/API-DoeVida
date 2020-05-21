import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import ResponseHelper from '../Helpers/ResponseHelper';
export const validatorMiddleware = (schema: Joi.Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    res.status(400)
    res.json(ResponseHelper.createResponse({statusCode: 400, statusDesc: 'Invalid Schema'} ,validation.error.details));

  }

  Object.assign(req, validation.value);

  return next();
};