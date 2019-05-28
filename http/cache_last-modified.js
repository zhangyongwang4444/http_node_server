/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/index.html*/

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
            // let stat = fs.statSync(filePath)
            // console.log(stat.mtime)
            // let modifyDate = new Date(Date.parse(stat.mtime)).toGMTString()
            // console.log(modifyDate)
            // res.setHeader('Cache-Control', 'no-cache')
            // res.setHeader('Last-Modified', modifyDate)

            //example2

            console.log(req.headers)
            let mtime = Date.parse(fs.statSync(filePath).mtime)
            res.setHeader('Cache-Control', 'no-cache')
            if (!req.headers['if-modified-since']) {
                res.setHeader('Last-Modified', new Date(mtime).toGMTString())
                res.writeHead(200, 'OK')
                res.end(data)
            } else {
                let oldMtime = Date.parse(req.headers['if-midified-since'])
                if (mtime > oldMtime) {
                    res.setHeader('Last-Modified', new Date(mtime).toGMTString())
                    res.writeHead(200, 'OK')
                    res.end(data)
                } else {
                    res.writeHead(304)
                    res.end()
                }
            }
            //example3
            // let mtime = Date.parse(fs.statSync(filePath).mtime)
            //10秒内，浏览器直接从自己本地拿，10秒后找服务器。如果没修改，告诉浏览器没修改

            // if (!req.headers['if-modified-since']) {
            //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
            //     res.writeHead(200, 'OK')
            //     res.end(data)
            // } else {
            //     let oldMtime = Date.parse(req.headers['if-modified-since'])
            //     if (mtime > oldMtime) {
            //         res.setHeader('Last-Modified', new Date(mtime).toGMTString())
            //         res.writeHead(200, 'OK')
            //         res.end(data)
            //     } else {
            //         res.writeHead(304)
            //         res.end()
            //     }
            // }

            // res.writeHead(200, 'OK')
            // res.end(data)
        }
    })
}).listen(8080)

console.log('Visit http://localhost:8080')