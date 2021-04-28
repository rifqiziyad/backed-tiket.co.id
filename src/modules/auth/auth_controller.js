const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`before Encript = ${userPassword}`)
      console.log(`after Encript = ${encryptPassword}`)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword
      }
      // kondisi cek email apakah ada di dalam database ?
      // jika ada response gagal msg = email sudah terdaftar
      // jika tidak ada = menjalankan proses model register user
      const result = await authModel.register(setData)
      console.log(result)
      delete result.user_password
      return helper.response(res, 200, 'Succes Register User', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataConditions({
        user_email: userEmail
      })

      // proses 1. pengecekkan apakah email ada di databases atau tidak
      if (checkEmailUser.length > 0) {
        // proses 2. pengecekkan password apakah password yg dimaasukkan sesuai atau tidak
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes login !', result)
        } else {
          return helper.response(res, 404, 'Wrong password')
        }
      } else {
        return helper.response(res, 404, 'Email / Account not registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
