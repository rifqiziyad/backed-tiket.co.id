const connection = require('../../config/mysql')

module.exports = {
  filterDataPremiere: (premiereName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(premiere_created_at) AS Month, SUM(premiere_price) AS Total FROM premiere WHERE premiere_name = '${premiereName}' GROUP BY MONTH(premiere_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  filterDataLocation: (locationName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(location_created_at) AS Month, SUM(location_price) AS Total FROM location WHERE location_city = '${locationName}' GROUP BY MONTH(location_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
