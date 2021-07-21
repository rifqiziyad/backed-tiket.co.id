const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`movie data by id:${id} is in redis`)
        return helper.response(
          res,
          200,
          `Succes Get Data Movie By Id:${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`movie data by id:${id} does not exist in redis`)
        next()
      }
    })
  },
  getMovieRedis: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('movie data is in redis')
        const newResult = JSON.parse(result) // {data, pageInfo}
        return helper.response(
          res,
          200,
          'Succes Get Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('movie data does not exist in redis')
        next()
      }
    })
  },
  clearDataMovieRedis: (req, res, next) => {
    console.log('Middleware clear redis movie is running')
    // proses pertama, cari kunci yg berawalan getmovie
    client.keys('getmovie*', (_error, result) => {
      console.log(result) // berbentuk array ex: ['getmovie:1', 'getmovie:{page limit ...}']
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
