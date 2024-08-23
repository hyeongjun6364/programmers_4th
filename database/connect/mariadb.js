const mariadb = require('mysql')
//mariadb 접속하는 방법
const conn = mariadb.createConnection({
  host: 'localhost', //mariadb가 있는주소
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'tennis',
})

module.exports = conn
