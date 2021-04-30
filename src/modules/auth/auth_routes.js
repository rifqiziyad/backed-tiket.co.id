const express = require('express')
const Route = express.Router()
const userController = require('../user/user_controller')

const { register, login } = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register, userController.updateUser)

module.exports = Route
