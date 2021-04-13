const helper = require('../../helpers/wrapper')
const timeModel = require('./time_model')

module.exports = {
  getAllTime: async (req, res) => {
    try {
      const result = await timeModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getTimeById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await timeModel.getDataById(id)

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
  postTime: async (req, res) => {
    try {
      console.log(req.body)
      const { premiereId, showTimeDate, showTimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showTimeDate,
        show_time_clock: showTimeClock
      }
      const result = await timeModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Time', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateTime: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(req.body)
      const { premiereId, showTimeDate, showTimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showTimeDate,
        show_time_clock: showTimeClock,
        show_time_updated_at: new Date(Date.now())
      }
      const result = await timeModel.updateData(setData, id)
      return helper.response(res, 200, 'Succes Update Time', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteTime: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await timeModel.getDataById(id)
      const result = await timeModel.deleteData(id)
      console.log(result)
      if (checkId.length > 0) {
        return helper.response(res, 200, 'Succes Delete Time By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
