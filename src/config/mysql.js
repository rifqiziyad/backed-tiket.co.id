const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticket-sans'
})

connection.connect((error) => {
  if (error) throw error
  console.log('You are now connected')
})

module.exports = connection
