const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redisBooking')

Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getBookingRedis,
  bookingController.getAllBooking
)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataBookingRedis,
  bookingController.postBooking
)

module.exports = Route
