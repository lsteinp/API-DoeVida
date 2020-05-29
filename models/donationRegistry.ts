import { Schema, Document } from 'mongoose'
import { Campaign } from './campaign'
import { User } from './users'

export interface donationRegistry extends Document {
  id: string;
  userId: User;
  campaignId: Campaign;
  date: Date;
}

const schema: Schema = new Schema({
  date: { type: Date, unique: false, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

schema.virtual('id').get(function (this: donationRegistry) {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => { },
  versionKey: false,
})

// Crie funções de schema aqui

export default schema
