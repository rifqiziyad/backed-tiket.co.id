const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getProfileByIdRedis: (req, res, next) => {
    const { id } = req.params
    console.log('Get data by id redis' + id)
    client.get(`getprofile:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`Profile data by id:${id} is in redis`)
        return helper.response(
          res,
          200,
          `Succes Get Data By Id:${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`Profile data by id:${id} does not exist in redis`)
        next()
      }
    })
  },
  clearDataProfileRedis: (req, res, next) => {
    // proses pertama, cari kunci yg berawalan getdata
    client.keys('getprofile*', (_error, result) => {
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
