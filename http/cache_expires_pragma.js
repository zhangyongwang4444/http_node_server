/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/picture.jpg*/

const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    console.log(req.url)
    let filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, 'not found')
            res.end('Oh,Not Found')
        } else {

            //example1
            // res.setHeader('Expires', 'Mon, 27 May 2019 23:07:00 GMT')

            //example2
            // res.setHeader('Pragma', 'no-cache')

            //example3
            // res.setHeader('Expires', 'Mon, 27 May 2019 24:07:00 GMT')
            // res.setHeader('Pragma', 'no-cache')

            //example4
            let date = new Date(Date.now() + 1000 * 5).toGMTString()
            res.setHeader('Expires', date)

            res.writeHead(200, 'OK')
            res.end(data)
        }
    })
}).listen(8080)

console.log('Visit http://localhost:8080')