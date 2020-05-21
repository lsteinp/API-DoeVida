const express        = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const UserController = require('../Controllers/UserController')

const routerUsers = express.Router()

//Fetch Routes
routerUsers.get('/', (req, res) => {
    UserController.fetchUsers(req.query, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, false))
    })
})

//Find Routes
routerUsers.get('/:id', (req, res) => {
    UserController.findUser(req.params.id, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, true))
    })
})

//Add Routes
routerUsers.post('/', (req, res) => {
    UserController.addUser(req.body, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, true))
    })
})

//Update Routes
routerUsers.put('/', (req, res) => {
    UserController.updateUser(req.body, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, true))
    })
})

//Delete Routes
routerUsers.delete('/:id', (req, res) => {
    UserController.deleteUser(req.params.id, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, true))
    })
})

module.exports = routerUsers