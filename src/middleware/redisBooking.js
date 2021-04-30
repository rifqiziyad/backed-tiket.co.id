const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getBookingRedis: (req, res, next) => {
    client.get(`getbooking:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('All show time data is in redis')
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Succes Get Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Show time data does not exist in redis')
        next()
      }
    })
  },
  clearDataBookingRedis: (req, res, next) => {
    // proses pertama, cari kunci yg berawalan getdata
    client.keys('getbooking*', (_error, result) => {
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
