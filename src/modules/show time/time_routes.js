const express = require('express')
const Route = express.Router()

const timeController = require('./time_controller')

Route.get('/', timeController.getAllTime)
Route.get('/:id', timeController.getTimeById)
Route.post('/', timeController.postTime)
Route.patch('/:id', timeController.updateTime)
Route.delete('/:id', timeController.deleteTime)

module.exports = Route
