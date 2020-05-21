import constants from '../config/constants'
import { Query, ControllerResponse } from '../Controllers'
import { Model, Document } from 'mongoose'
import { User } from '../models/users'

export default class UsersDAO {
  userModel: Model<Document, {}>

  constructor(userModel: Model<Document, {}>) {
    this.userModel = userModel
  }

  createOrderClause(query: Query) {
    return { [query.field]: query.isAscending }
  }

  createWhereClause(query: Query) {
    if (query.contains !== undefined) {
      // @ts-ignore
      query.$or = [
        // equivalente à new RegExp(query.contains, "i")
        { name: { $regex: `${query.contains}`, $options: 'i' } },
        { email: { $regex: `${query.contains}`, $options: 'i' } },
      ]
    }
    delete query.contains

    return query
  }

  async fetchUsers(orderQuery: Query, whereQuery: Query): Promise<ControllerResponse> {
    try {
      const where = this.createWhereClause(whereQuery)
      const order = this.createOrderClause(orderQuery)

      const data = await this.userModel.find(where).sort(order).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async findUser(id: string): Promise<ControllerResponse> {
    try {
      const data = await this.userModel.findById(id).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async findUserByEmail(email: string): Promise<ControllerResponse> {
    try {
      const data = await this.userModel.findOne({ email }).exec() as User
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async login(token: string, email: string, name: string): Promise<ControllerResponse> {
    try {
      let { data }  = await this.findUserByEmail(email)
      if (data) {
        if (data.token != token) {
          data = await this.userModel.findByIdAndUpdate(data.id, { token }).exec() as User
        }
      } else {
        const newUser = new this.userModel({
          token,
          email,
          name
        })
        data = await newUser.save() as User
      }

      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async addUser(user: any): Promise<ControllerResponse> {
    try {
      const newUser = new this.userModel(user)
      const data = await newUser.save()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async updateUser(newUserData: any): Promise<ControllerResponse> {
    const id = newUserData._id
      ? newUserData._id
      : newUserData.id

    if (!id) {
      const errorObj = { statusDesc: constants.notFoundDesc + '. Nenhum id foi fornecido!', statusCode: constants.notFound }
      return { errorObj, data: null }
    }

    try {
      const data = await this.userModel.findByIdAndUpdate(newUserData._id, newUserData).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async deleteUser(id: string): Promise<ControllerResponse> {
    try {
      const data = await this.userModel.findByIdAndRemove(id).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

}