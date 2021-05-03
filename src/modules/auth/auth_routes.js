const express = require('express')
// const { isAdmin } = require('../../middleware/auth')
const Route = express.Router()
const { register, login, changeUserStatus } = require('./auth_controller')
// const authController = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.patch('/update/:id', changeUserStatus)

module.exports = Route
