const express = require('express')
const Route = express.Router()
const seatController = require('./seat_controller')

Route.get('/', seatController.getAllSeat)
Route.post('/', seatController.postSeat)

module.exports = Route
