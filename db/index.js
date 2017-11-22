const mysql      = require('mysql')
var dev = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'huiyi'
}
var prod = {
  host     : 'localhost',
  user     : 'huiyi',
  password : '8ZamEDCX58',
  database : 'huiyi'
}

const connection = mysql.createConnection(prod)

connection.connect()

module.exports = connection