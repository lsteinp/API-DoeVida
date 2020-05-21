import constants from '../config/constants'
import jwt from 'jsonwebtoken'
import ResponseHelper from '../Helpers/ResponseHelper'
import sha256 from 'sha256'
import { Response, NextFunction } from 'express'
import { APIRequest } from '../Controllers/index'
import models from '../models'

const UserModel = models.User

// const users = db.sequelize.model('Users')

export default class AuthManager {
  static ensureUserToken(req: APIRequest, res: Response, next: NextFunction) {
    if (AuthManager.containsToken(req)) {
      const token = req.token ? req.token : ''
      jwt.verify(token, constants.APISecretKey, function (err: any, data: any) {
        if (err) {
          const error = { statusDesc: constants.invalidToken, statusCode: constants.errorCodeAuth }
          res.json(ResponseHelper.createResponse(error, null))
        } else {
          req.User = data
          next()
        }
      })
    } else {
      const error = { statusDesc: constants.tokenNotFound, statusCode: constants.errorCodeAuth }
      res.json(ResponseHelper.createResponse(error, null))
    }
  }

  static generateToken(userData: any) {
    return jwt.sign(userData, constants.APISecretKey, { expiresIn: constants.sessionTime })
  }

  static ensureValidUser(username: string, password: string, callback: any) {
    UserModel
      .findOne({ username: username }, '+password +salt', (error: any, userFound: any) => {
        if (error) {
          const errorObj = { statusDesc: error, statusCode: constants.errorCodeMongoose }
          return callback(errorObj, null)
        }
        if (userFound && userFound.password === sha256(password + userFound.salt)) {
          userFound = userFound.toObject()
          delete userFound.password
          delete userFound.salt
          delete userFound.__v
          userFound.id = userFound._id
          return callback(null, userFound)
        }
        const errorObj = { statusDesc: constants.authenticationFailed, statusCode: constants.errorCodeAuth }
        return callback(errorObj, null)
      })
  }

  static containsToken(req: APIRequest): boolean {
    const bearerHeader = req.headers.authorization
    if (bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      return true
    } else {
      return false
    }
  }
}
