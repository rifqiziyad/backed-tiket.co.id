const express = require('express')
const Route = express.Router()

const timeController = require('./time_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redisShowTime')

Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getShowTimeRedis,
  timeController.getAllTime
)
Route.get(
  '/schedule',
  authMiddleware.authentication,
  // redisMiddleware.getShowTimeRedis,
  timeController.getDataSchedule
)
Route.get(
  '/:id',
  redisMiddleware.getShowTimeByIdRedis,
  timeController.getTimeById
)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataShowTimeRedis,
  timeController.postTime
)
Route.patch(
  '/:id',
  redisMiddleware.clearDataShowTimeRedis,
  timeController.updateTime
)
Route.delete(
  '/:id',
  redisMiddleware.clearDataShowTimeRedis,
  timeController.deleteTime
)

module.exports = Route
