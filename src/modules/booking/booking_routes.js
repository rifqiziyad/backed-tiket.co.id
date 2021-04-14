const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')

Route.get('/', bookingController.getAllBooking)
Route.post('/', bookingController.postBooking)

module.exports = Route
