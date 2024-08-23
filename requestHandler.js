const fs = require('fs')
const main_view = fs.readFileSync('./main.html', 'utf-8')
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8')
const mariadb = require('./database/connect/mariadb')

function main(response) {
  //sql 던지기
  mariadb.query('select * from product', function (err, rows) {
    console.log(rows)
  })

  response.writeHead(200, { 'Content-Type': 'text/html' }) //head
  response.write(main_view) // body
  response.end()
  console.log('main')
}
function redRacket(response) {
  fs.readFile('./img/redRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' }) //head
    response.write(data) // body
    response.end()
  })
}
function blueRacket(response) {
  fs.readFile('./img/blueRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' }) //head
    response.write(data) // body
    response.end()
  })
}
function blackRacket(response) {
  fs.readFile('./img/blackRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' }) //head
    response.write(data) // body
    response.end()
  })
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html' }) //head

  mariadb.query(
    'INSERT INTO orderlist VALUES (' +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows)
    }
  )
  response.write('order page') // body
  response.end()
}
function orderlist(response) {
  response.writeHead(200, { 'Content-Type': 'text/html' }) //head
  mariadb.query('select * from orderlist', function (err, rows) {
    response.write(orderlist_view) // body
    rows.forEach((element) => {
      response.write(
        '<tr>' +
          '<td>' +
          element.product_id +
          '</td>' +
          '<td>' +
          element.order_date +
          '</td>' +
          '</tr>'
      )
    })
    response.write('</table>')
    response.end()
    console.log(rows)
  })
}

let handle = {}
handle['/'] = main //handle['/]이 호출되면 main이 호출되는거랑 같음
handle['/order'] = order
handle['/orderlist'] = orderlist
// image directory
handle['/img/redRacket.png'] = redRacket
handle['/img/blueRacket.png'] = blueRacket
handle['/img/blackRacket.png'] = blackRacket

exports.handle = handle
