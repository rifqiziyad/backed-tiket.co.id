const helper = require('../../helpers/wrapper')
const userModel = require('../user/user_model')

module.exports = {
  getUserId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getDataById(id)

      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get User Data By Id', result)
      } else {
        return helper.response(res, 404, `Data By Id:${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_status: 100
      }
      const result = await userModel.updateData(setData, id)
      const getUserId = await userModel.getDataById(id)
      if (getUserId.length > 0) {
        console.log(setData)
        return helper.response(
          res,
          200,
          `Succes Update User Data By Id:${id}`,
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
