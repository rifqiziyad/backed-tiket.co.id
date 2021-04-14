const helper = require('../../helpers/wrapper')
const seatModel = require('./seat_model')

module.exports = {
  getAllSeat: async (req, res) => {
    try {
      console.log('Proses get all seat')
      const result = await seatModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postSeat: async (req, res) => {
    try {
      console.log(req.body)
      const { bookingId, bookingSeatLocation } = req.body
      const setData = {
        booking_id: bookingId,
        booking_seat_location: bookingSeatLocation
      }
      const result = await seatModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Seat', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
