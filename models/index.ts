'use strict'

import mongoose from 'mongoose'
import config from '../config/config'

import userSchema from './users'
import donationEntitySchema from './donationEntity'
import addressSchema from './address'
import campaignSchema from './campaign'

const { db: { host, port } } = config
// const connectionString = `mongodb://${host}:${port}/`
const connectionString = 'mongodb+srv://test-doevida:lXBiujAdYmsWANvq@test-doevida-wtgdu.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(connectionString, config.mongoose).then(
  () => {
    console.log('Connected to MongoDB...')
  },
  err => {
    console.error(`Error: ${err}`)
  }
)
  .catch(err => {
    console.error(`Error Caught: ${err}`)
  })

mongoose.set('debug', config.settings.logging)
mongoose.set('useCreateIndex', config.settings.useCreateIndex)

const models = {
  User: mongoose.model('User', userSchema),
  DonationEntity: mongoose.model('DonationEntity', donationEntitySchema),
  Address: mongoose.model('Address', addressSchema),
  Campaign: mongoose.model('Campaign', campaignSchema),
}

export default models
