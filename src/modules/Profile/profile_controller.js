const helper = require('../../helpers/wrapper')
const profileModel = require('./profile_model')
const client = require('../../config/redis')
const fs = require('fs')

module.exports = {
  getProfileId: async (req, res) => {
    try {
      const { id } = req.params
      const getDataById = await profileModel.getDataById(id)
      console.log(getDataById)
      if (getDataById.length > 0) {
        client.set(`getprofile:${id}`, JSON.stringify(getDataById))
        return helper.response(
          res,
          200,
          `Succes Get Data By Id = ${id}`,
          getDataById
        )
      } else {
        return helper.response(res, 404, `Data By Id:${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params
      const { userFirstName, userlastName, userEmail, userPhoneNumber } =
        req.body
      const setData = {
        user_name: userFirstName,
        user_last_name: userlastName,
        user_email: userEmail,
        user_phone_number: userPhoneNumber,
        user_image: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }
      const getDataById = await profileModel.getDataById(id)
      const result = await profileModel.patchData(setData, id)
      if (getDataById.length > 0) {
        console.log(result)
        fs.stat(
          `src/uploads/${getDataById[0].movie_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${getDataById[0].movie_image}`,
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
          `Succes Update Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id:${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params
      const getDataById = await profileModel.getDataById(id)
      const result = await profileModel.deleteData(id)
      if (getDataById.length > 0) {
        fs.stat(
          `src/uploads/${getDataById[0].movie_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${getDataById[0].movie_image}`,
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
          `Succes Delete Data By Id : ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id = ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
