const express = require('express')
const Route = express.Router()
const { getFilterPremiere, getFilterLocation } = require('./filter_controller')

Route.get('/premiere', getFilterPremiere)
Route.get('/location', getFilterLocation)

module.exports = Route
