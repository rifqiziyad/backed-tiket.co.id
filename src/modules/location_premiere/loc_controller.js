const helper = require('../../helpers/wrapper')
const locationModel = require('./loc_model')

module.exports = {
  getAllLocation: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await locationModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await locationModel.getDataAll(limit, offset)
      return helper.response(res, 200, 'Succes Get Data', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getDataById(id)

      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postLocation: async (req, res) => {
    try {
      console.log(req.body)
      const { locationName, locationCinema } = req.body
      const setData = {
        location_name: locationName,
        location_cinema: locationCinema
      }
      const result = await locationModel.createData(setData)
      return helper.response(
        res,
        200,
        'Succes Create Premiere Location',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(req.body)
      const { locationName, locationCinema } = req.body
      const setData = {
        location_name: locationName,
        location_cinema: locationCinema,
        location_update_at: new Date(Date.now())
      }
      const result = await locationModel.updateData(setData, id)
      return helper.response(
        res,
        200,
        'Succes Update Premiere Location',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await locationModel.getDataById(id)
      const result = await locationModel.deleteData(id)
      console.log(result)
      // kondisi cek data di dalam database ada berdasarkan id..
      // hasil response untuk delete id yg ke delete saja
      if (checkId.length > 0) {
        return helper.response(res, 200, 'Succes Delete Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
