const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const locationRouter = require('../modules/location/loc_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const timeRouter = require('../modules/show time/time_routes')

// [1]
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

// [2]
Route.use('/movie', movieRouter)
Route.use('/location', locationRouter)
Route.use('/premiere', premiereRouter)
Route.use('/time', timeRouter)

module.exports = Route
