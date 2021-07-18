const express = require('express')
const Route = express.Router()

const premiereController = require('./premiere_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redisPremiere')

Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getPremiereRedis,
  premiereController.getAllPremiere
)
Route.get(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.getPremiereByIdRedis,
  premiereController.getPremiereById
)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  premiereController.postPremiere
)
Route.patch(
  '/:id',
  uploadFile,
  redisMiddleware.clearDataPremiereRedis,
  premiereController.updatePremiere
)
Route.delete(
  '/:id',
  redisMiddleware.clearDataPremiereRedis,
  premiereController.deletePremiere
)

module.exports = Route
