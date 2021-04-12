const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const locationRouter = require('../modules/location_premiere/loc_routes')

// [1]
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

// [2]
Route.use('/movie', movieRouter)
Route.use('/premiere_location', locationRouter)

module.exports = Route
