import constants from '../config/constants'
import { ControllerResponse } from '../Controllers'
import { Model, Document } from 'mongoose'
import AddressDAO from './AddressDAO'
import { Campaign } from '../models/campaign'
import { User } from '../models/users'


export interface AddDonationRegistryDTO {
    userId: User;
    campaignId: Campaign;
    date: Date;
  };


export default class DonationRegistryDAO {
  donationRegistryModel: Model<Document, {}>

  constructor(donationRegistryModel: Model<Document, {}>) {
    this.donationRegistryModel = donationRegistryModel
  }

  async fetchDonationRegistries(): Promise<ControllerResponse> {
    try {
      let data = []
      data = await this.donationRegistryModel.find().populate('userId', 'campaignId').exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async addDonationRegistry(addDonationRegistryDTO: AddDonationRegistryDTO): Promise<ControllerResponse> {
    try {
      const newDonationRegistry = new this.donationRegistryModel(addDonationRegistryDTO)

      const data = await newDonationRegistry.save()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async findDonationRegistry(id: string): Promise<ControllerResponse> {
    try {
      const data = await this.donationRegistryModel.findById(id).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

}
