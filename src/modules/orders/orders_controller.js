const helper = require('../../helpers/wrapper')
const orderModel = require('./orders_model')

module.exports = {
  getOrderDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await orderModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get order data by id:' + id,
          result
        )
      } else {
        return helper.response(
          res,
          200,
          'Order data by id:' + id + ' not found'
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  createOrderData: async (req, res) => {
    try {
      const {
        orderMovieName,
        orderDate,
        orderTime,
        orderCount,
        orderSeats,
        orderPrice,
        orderPremiereImage,
        userId
      } = req.body
      const setData = {
        user_id: userId,
        order_movie_name: orderMovieName,
        order_date: orderDate,
        order_time: orderTime,
        order_count: orderCount,
        order_seats: orderSeats,
        order_price: orderPrice,
        order_premiere_image: orderPremiereImage
      }
      const result = await orderModel.createData(setData)
      return helper.response(res, 200, 'Success Create Order Data', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
