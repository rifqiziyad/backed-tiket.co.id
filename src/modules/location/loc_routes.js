const express = require('express')
const Route = express.Router()

const locationController = require('./loc_controller')

Route.get('/', locationController.getAllLocation)
Route.get('/:id', locationController.getLocationById)
Route.post('/', locationController.postLocation)
Route.patch('/:id', locationController.updateLocation)
Route.delete('/:id', locationController.deleteLocation)

module.exports = Route
