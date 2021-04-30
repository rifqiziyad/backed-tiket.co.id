const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')

Route.get('/:id', userController.getUserId)
Route.patch('/:id', userController.updateUser)

module.exports = Route
