const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

module.exports = {
  getAllPremiere: async (req, res) => {
    try {
      const result = await premiereModel.getDataAll()
      console.log(result)
      client.setex(
        `getpremiere:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(result)
      )
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataById(id)

      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(result)
      if (result.length > 0) {
        client.set(`getpremiere:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Succes Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      console.log(req.body)
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_image: req.file ? req.file.filename : ''
      }
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data Premiere', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi cek data di dalam database ada berdasarkan id..

      console.log(req.body)
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_image: req.file ? req.file.filename : ''
      }
      const result = await premiereModel.updateData(setData, id)
      const getDataById = await premiereModel.getDataById(id)
      if (getDataById.length > 0) {
        fs.stat(
          `src/uploads/${getDataById[0].premiere_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${getDataById[0].premiere_image}`,
              function (err) {
                if (err) return console.log(err)
                console.log('file deleted successfully')
              }
            )
          }
        )

        return helper.response(res, 200, 'Succes Update Data Premiere', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const getDataById = await premiereModel.getDataById(id)
      const result = await premiereModel.deleteData(id)
      console.log(result)
      // kondisi cek data di dalam database ada berdasarkan id..
      if (getDataById.length > 0) {
        fs.stat(
          `src/uploads/${getDataById[0].premiere_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${getDataById[0].premiere_image}`,
              function (err) {
                if (err) return console.log(err)
                console.log('file deleted successfully')
              }
            )
          }
        )
        return helper.response(
          res,
          200,
          `Succes Delete Data Premiere By Id = ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Premiere By Id = ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
