const helper = require('../../helpers/wrapper')
const filterModel = require('./filter_model')

module.exports = {
  getFilterPremiere: async (req, res) => {
    try {
      const { premiereName } = req.body
      const result = await filterModel.filterDataPremiere(premiereName)
      return helper.response(
        res,
        200,
        `Succes Filter Premiere Data By Premiere Name = ${premiereName}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getFilterLocation: async (req, res) => {
    try {
      const { locationName } = req.body
      const result = await filterModel.filterDataLocation(locationName)
      console.log(result)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Filter Location Data By Location Name = ${locationName}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Location Name : ${locationName} Doesn't Exist`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
