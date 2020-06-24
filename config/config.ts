import * as dotenv from 'dotenv'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV || 'dev'
const HTTP_PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4000
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost'
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : ''
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : ''
const DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : ''
const DB_POOL_SIZE = process.env.DB_POOL_SIZE ? process.env.DB_POOL_SIZE : 5

const dev = {
  app: {
    port: HTTP_PORT,
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
  },
  mongoose: { // https://mongoosejs.com/docs/connections.html
    useNewUrlParser: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    dbName: DB_DATABASE,
    poolSize: DB_POOL_SIZE,
  },
  settings: {
    logging: true,
    useCreateIndex: true,
  }
}

const test = {
}

const production = {
  app: {
    port: HTTP_PORT,
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
  },
  mongoose: { // https://mongoosejs.com/docs/connections.html
    useNewUrlParser: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    dbName: DB_DATABASE,
    poolSize: DB_POOL_SIZE,
  },
  settings: {
    logging: true,
    useCreateIndex: true,
  }
}

const config = {
  dev,
  test,
  production
}
// @ts-ignore
export default config[NODE_ENV]