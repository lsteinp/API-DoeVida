import { Model, Document } from 'mongoose'
import { Address } from '../models/address'

export interface AddressDTO {
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

export default class AddressDAO {
  addressModel: Model<Document, {}>

  constructor(addressModel: Model<Document, {}>) {
    this.addressModel = addressModel
  }

  async findAddress(addressDTO: AddressDTO): Promise<Address> {
    const address = await this.addressModel.findOne(addressDTO).exec() as Address
    return address
  }

  async addAddress(addressDTO: AddressDTO): Promise<Address> {
    const newAddress = new this.addressModel(addressDTO)
    const data = await newAddress.save()
    return data as Address
  }

  async findOrCreate(addressDTO: AddressDTO): Promise<Address> {
    const address = await this.findAddress(addressDTO)
    if (address) {
      return address
    } else {
      const newAddress = await this.addAddress(addressDTO)
      return newAddress
    }
  }
}
