const express = require('express')
const Route = express.Router()

const locationController = require('./loc_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redisLocation')

Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getLocationRedis,
  locationController.getAllLocation
)
Route.get(
  '/:id',
  redisMiddleware.getLocationByIdRedis,
  locationController.getLocationById
)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataLocationRedis,
  locationController.postLocation
)
Route.patch(
  '/:id',
  redisMiddleware.clearDataLocationRedis,
  locationController.updateLocation
)
Route.delete(
  '/:id',
  redisMiddleware.clearDataLocationRedis,
  locationController.deleteLocation
)

module.exports = Route
