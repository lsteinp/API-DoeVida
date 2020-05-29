import { Schema, Document } from 'mongoose'

export interface Address extends Document {
  id: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

const schema: Schema = new Schema({
  street: { type: String, unique: false, required: true },
  number: { type: Number, unique: false, required: true },
  complement: { type: String, unique: false, required: false },
  district: { type: String, unique: false, required: true },
  city: { type: String, unique: false, required: true },
  state: { type: String, unique: false, required: true },
  country: { type: String, unique: false, required: true },
  latitude: { type: Number, unique: false, required: true },
  longitude: { type: Number, unique: false, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

schema.virtual('id').get(function (this: Address) {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => { },
  versionKey: false,
})

// Crie funções de schema aqui

export default schema


