const express = require('express')
const { authentication } = require('../../middleware/auth')
const Route = express.Router()

const {
  getOrderDataById,
  createOrderData,
  orderChart
} = require('./orders_controller')

Route.get('/:id', authentication, getOrderDataById)
Route.get('/', authentication, orderChart)
Route.post('/', authentication, createOrderData)

module.exports = Route
