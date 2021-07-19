const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      // proses validasi token
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          // console.log(result) // berisi data sebelum di enkripsi
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login first !')
    }
  },
  isAdmin: (req, res, next) => {
    console.log('middleware isAdmin running !')
    const checkUserRole = req.decodeToken.user_role
    // check kondisi apakah user admin atau bukan ?
    if (checkUserRole === 1) {
      next()
    } else {
      return helper.response(res, 404, 'Only Admin Can Access')
    }
  }
}
