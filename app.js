const models     = require("./models")
const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')

const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')

const TokenManager = require('./Helpers/AuthManager')
var config = require('./config/config')

// Initialize server
// models.sequelize.sync().then(function() {
//     setupServer()
// })

setupServer()

function setupServer() {
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/api/login', loginRouter)
    app.use('/api/users', /*TokenManager.ensureUserToken,*/ usersRouter)

    app.listen(config.app.port, function () {
        console.log(`Server listening on port ${config.app.port}`)
    })
}