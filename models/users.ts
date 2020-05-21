import { Schema, Document } from 'mongoose'

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  token: string;
}

const schema: Schema = new Schema({
  name: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true, dropDups: true },
  token: { type: String, unique: false, required: true, select: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })


schema.virtual('id').get(function (this: User) {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => { },
  versionKey: false,
})

export default schema


