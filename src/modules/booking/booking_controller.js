const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      console.log('Proses get all booking')
      const result = await bookingModel.getDataAll()
      client.setex(
        `getbooking:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(result)
      )
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBooking: async (req, res) => {
    try {
      console.log(req.body)
      const {
        premiereId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus
      } = req.body
      const setData = {
        premiere_id: premiereId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
