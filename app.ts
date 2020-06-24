import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import loginRouter from './routes/login'
import usersRouter from './routes/users'
import routerDonationEntity from './routes/donationEntity'
import routerCampaign from './routes/campaign'
import routerPrivacyPolicy from './routes/privacyPolicy'
import config from './config/config'

function setupServer(): void {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use('/api/login', loginRouter)
  app.use('/api/users', /*TokenManager.ensureUserToken,*/ usersRouter)
  app.use('/api/donationEntity', /*TokenManager.ensureUserToken,*/ routerDonationEntity)
  app.use('/api/campaign', /*TokenManager.ensureUserToken,*/ routerCampaign)
  app.use('/api/privacyPolicy', /*TokenManager.ensureUserToken,*/ routerPrivacyPolicy)

  app.listen(config.app.port, function () {
    console.log(`Server listening on port ${config.app.port}`)
  })
}

setupServer()