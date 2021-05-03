const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`before Encript = ${userPassword}`)
      console.log(`after Encript = ${encryptPassword}`)
      const getDataConditions = await authModel.getDataConditions({
        user_email: userEmail
      })
      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword
      }
      console.log(getDataConditions)
      // kondisi cek email apakah ada di dalam database ?
      if (getDataConditions.length <= 0) {
        // jika tidak ada, menjalankan proses model register user
        console.log(process.env.SMTP_EMAIL)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })
        const result = await authModel.register(setData)
        const mailOptions = {
          from: '"Sans 😂👌" <rifqiziyad4@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: 'Ticket Sans - Activation Email', // Subject line
          html: `<b>Click Here to activate </b><a href='http://localhost:3001/api/v1/user/${result.id}'>Click !</>` // html body
        }
        console.log(mailOptions.html)

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email sent:' + info.response)
            return helper.response(res, 200, 'Check Your Email')
          }
        })

        console.log(result)
        delete result.user_password
        return helper.response(res, 200, 'Success Verification Email', result)
      } else {
        // jika ada response gagal msg = email sudah terdaftar
        return helper.response(res, 404, `${userEmail} Registered`)
      }
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
  },
  changeUserStatus: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_status: 100
      }
      const result = await authModel.updateData(setData, id)
      const getUserId = await authModel.getDataById(id)
      console.log(getUserId)
      console.log(result)
      if (getUserId.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Update Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
