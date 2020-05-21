import constants from '../config/constants'
import { ControllerResponse } from '../Controllers'
import { Model, Document } from 'mongoose'
import AddressDAO from './AddressDAO'

export interface AddDonationEntityDTO {
  name: string;
  address: {
    street: string;
    number: number;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}

export default class DonationEntityDAO {
  donationEntityModel: Model<Document, {}>
  addressDAO: AddressDAO

  constructor(donationEntityModel: Model<Document, {}>, addressDAO: AddressDAO) {
    this.donationEntityModel = donationEntityModel
    this.addressDAO = addressDAO
  }

  async fetchDonationEntities(addressId?: string): Promise<ControllerResponse> {
    try {
      let data = []
      if (addressId) {
        data = await this.donationEntityModel.find({ addressId }).populate('addressId').exec()
      } else {
        data = await this.donationEntityModel.find().populate('addressId').exec()
      }
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async addDonationEntity(addDonationEntityDTO: AddDonationEntityDTO): Promise<ControllerResponse> {
    try {
      if (!addDonationEntityDTO.address) {
        throw new Error('Invalid address')
      }

      const address = await this.addressDAO.findOrCreate(addDonationEntityDTO.address)

      const newDonationEntity = new this.donationEntityModel({
        name: addDonationEntityDTO.name,
        addressId: address.id,
      })

      const data = await newDonationEntity.save()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async findDonationEntity(id: string): Promise<ControllerResponse> {
    try {
      const data = await this.donationEntityModel.findById(id).exec()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

}
