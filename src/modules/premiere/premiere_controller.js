const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
const client = require('../../config/redis')
const fs = require('fs')

module.exports = {
  getAllPremiere: async (req, res) => {
    try {
      const result = await premiereModel.getDataAll()

      for (const value of result) {
        value.show_time = await premiereModel.getShowTimeData(value.premiere_id)
      }

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
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setDataPremiere = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_image: req.file ? req.file.filename : ''
      }
      const result = await premiereModel.createData(setDataPremiere)
      return helper.response(res, 200, 'Succes Create Data Premiere', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi cek data di dalam database ada berdasarkan id..
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_image: req.file ? req.file.filename : '',
        premiere_updated_at: new Date(Date.now())
      }

      const getDataById = await premiereModel.getDataById(id)
      if (getDataById.length > 0) {
        if (req.file) {
          fs.unlink(`src/uploads/${getDataById[0].premiere_image}`, (error) => {
            error
              ? console.log('Image not found')
              : console.log('Image deleted')
          })
        }
        const result = await premiereModel.updateData(setData, id)
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
        const imageToDelete = getDataById[0].premiere_image
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
          })
        }

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
