const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getPremiereByIdRedis: (req, res, next) => {
    const { id } = req.params
    console.log('Get data by id redis' + id)
    client.get(`getpremiere:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`Premiere data by id:${id} is in redis`)
        return helper.response(
          res,
          200,
          `Succes Get Data By Id:${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`Premiere data by id:${id} does not exist in redis`)
        next()
      }
    })
  },
  getPremiereRedis: (req, res, next) => {
    client.get(`getpremiere:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('Premiere data is in redis')
        const newResult = JSON.parse(result)
        return helper.response(res, 200, 'Succes Get Movie', newResult)
      } else {
        console.log('Premiere data does not exist in redis')
        next()
      }
    })
  },
  clearDataPremiereRedis: (req, res, next) => {
    // proses pertama, cari kunci yg berawalan getdata
    client.keys('getpremiere*', (_error, result) => {
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
