import { Schema, Document } from 'mongoose'
import { DonationEntity } from './donationEntity'
import { User } from './users'

export enum CampaignStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum BloodType {
  A_POSITIVE = 'A_POSITIVE',
  B_POSITIVE = 'B_POSITIVE',
  O_POSITIVE = 'O_POSITIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  O_NEGATIVE = 'O_NEGATIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  T_ALL = 'T_ALL',
}

export interface Campaign extends Document {
  id: string;
  donationEntity: DonationEntity;
  user: User;
  receiverName: string;
  bloodType: BloodType;
  status: CampaignStatus;
}

const schema: Schema = new Schema({
  donationEntityId: { type: Schema.Types.ObjectId, ref: 'DonationEntity', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverName: { type: String, unique: false, required: true },
  bloodType: { type: String, unique: false, required: true },
  status: { type: String, unique: false, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

schema.virtual('id').get(function (this: Campaign) {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => { },
  versionKey: false,
})

// Crie funções de schema aqui

export default schema


