
const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, 'not found')
            res.end('Oh,Not Found')
        } else {
            //example2

            console.log(req.headers['if-none-match'])
            let oldEtag = req.headers['if-none-match']
            if (!oldEtag) {
                let md5 = crypto.createHash('md5')
                res.setHeader('Etag', md5.update(data).digest('base64'))
                res.writeHead(200, 'OK')
                res.end(data)
            } else {
                let newEtag = crypto.createHash('md5').update(data).digest('base64')
                if (oldEtag !== newEtag) {
                    res.setHeader('Etag', newEtag)
                    res.writeHead(200, 'OK')
                    res.end(data)
                } else {
                    res.writeHead(304)
                    res.end()
                }
            }
        }
    })
}).listen(8080)

console.log('Visit http://localhost:8080')