const express = require('express')
const { authentication } = require('../../middleware/auth')
const Route = express.Router()

const { getOrderDataById, createOrderData } = require('./orders_controller')

Route.get('/:id', authentication, getOrderDataById)
Route.post('/', authentication, createOrderData)

module.exports = Route
