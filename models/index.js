'use strict'

const fs        = require('fs')
const path      = require('path')
const mongoose = require('mongoose');
const basename  = path.basename(__filename)
const config = require('../config/config')
const models        = {}

const { db: { host, port } } = config
const connectionString = `mongodb://${host}:${port}/`

// @ts-ignore
mongoose.connect(connectionString, config.mongoose).then(
  () => {
    console.log('Connected to MongoDB...') // Processamento assíncrono, pode acontecer das coisas abaixo disso executarem antes deste log. Fica a dica.
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


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const fileData = require(`./${file}`)()
    models[fileData.name] = mongoose.model(fileData.name, fileData.schema)
  })

module.exports = models