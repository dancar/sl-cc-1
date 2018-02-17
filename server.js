const fs = require('fs')
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()
app.use(express.static('build'))
app.use('/dev', proxy({target: 'http://localhost:3000', pathRewrite: {'/dev': '/'}}))
app.use('/static', proxy({target: 'http://localhost:3000'}))

app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8',
              (err, data) =>
              res.send(JSON.stringify(JSON.parse(data))))
})

const PORT = 4000
app.listen(PORT, () => console.log("listening on " + PORT))
