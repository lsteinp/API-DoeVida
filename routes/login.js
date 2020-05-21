const express         = require('express')
const ResponseHelper  = require('../Helpers/ResponseHelper')
const LoginController = require('../Controllers/LoginController')

const routerLogin = express.Router()

routerLogin.post('/', function (req, res) {
    LoginController.login(req.body.username, req.body.password, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, false))
    })
})

routerLogin.get('/token', function (req, res) {
    LoginController.validateToken(req, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, false))
    })
})

module.exports = routerLogin