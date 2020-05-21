import { Schema, Document } from 'mongoose'
import { Address } from './address'

export interface DonationEntity extends Document {
  id: string;
  name: string;
  address: Address;
}

const schema: Schema = new Schema({
  name: { type: String, unique: false, required: true },
  addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

schema.virtual('id').get(function (this: DonationEntity) {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => { },
  versionKey: false,
})

// Crie funções de schema aqui

export default schema