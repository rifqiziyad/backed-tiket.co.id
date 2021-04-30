const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const profileController = require('./profile_controller')
const redisMiddleware = require('../../middleware/redisProfile')

Route.get(
  '/:id',
  redisMiddleware.getProfileByIdRedis,
  profileController.getProfileId
)
Route.patch(
  '/:id',
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataProfileRedis,
  profileController.updateProfile
)
Route.delete(
  '/:id',
  authMiddleware.isAdmin,
  redisMiddleware.clearDataProfileRedis,
  profileController.deleteProfile
)

module.exports = Route
