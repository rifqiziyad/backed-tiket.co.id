const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getLocationByIdRedis: (req, res, next) => {
    const { id } = req.params
    console.log('Get data by id redis' + id)
    client.get(`getlocation:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`Location data by id:${id} is in redis`)
        return helper.response(
          res,
          200,
          `Succes Get Data By Id:${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`Location data by id:${id} does not exist in redis`)
        next()
      }
    })
  },
  getLocationRedis: (req, res, next) => {
    client.get(`getlocation:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('All location data is in redis')
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Succes Get Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Location data does not exist in redis')
        next()
      }
    })
  },
  clearDataLocationRedis: (req, res, next) => {
    // proses pertama, cari kunci yg berawalan getdata
    client.keys('getlocation*', (_error, result) => {
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
