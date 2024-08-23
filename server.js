let http = require('http')
let url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    // 서버의 url의 경로를 확인
    let pathname = url.parse(request.url).pathname
    let queryData = url.parse(request.url, true).query

    //루트함수 호출
    route(pathname, handle, response, queryData.productId)
  }
  http.createServer(onRequest).listen(8888)
}
// start라는 함수를 start라는 이름으로 다른 파일에서도 사용가능
exports.start = start
