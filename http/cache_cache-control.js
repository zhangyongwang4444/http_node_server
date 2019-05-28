/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/picture.jpg*/

const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, 'not found')
            res.end('Oh,Not Found')
        } else {

            //example1
            // res.setHeader('Cache-Control', 'max-age=10')

            //example2
            // res.setHeader('Cache-Control', 'no-cache')

            //example3
            res.setHeader('Cache-Control', 'no-store')



            res.writeHead(200, 'OK')
            res.end(data)
        }
    })
}).listen(8080)

console.log('Visit http://localhost:8080')