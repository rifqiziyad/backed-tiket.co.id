const connection = require('../../config/mysql')

module.exports = {
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM orders WHERE order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  dataForChart: (movieName, premiereName, locationName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(order_created_at) AS date, SUM(order_price) AS data FROM orders WHERE order_movie_name LIKE '%${movieName}%' AND order_premiere_name LIKE '%${premiereName}%' AND order_location LIKE '%${locationName}%' AND YEAR(order_created_at) = YEAR(NOW()) GROUP BY MONTH(order_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
