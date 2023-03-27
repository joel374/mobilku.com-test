const mysql = require("mysql")

const pool = mysql.createPool({
  host: "db4free.net",
  user: "joellegifani",
  password: "joel300704",
  database: "mobilku_com",
  connectionLimit: 100,
  multipleStatements: true,
  port: 3306,
})

module.exports = pool
