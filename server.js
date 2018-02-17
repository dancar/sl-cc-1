const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()
app.use(express.static('build'))
app.use('/dev', proxy({target: 'http://localhost:3000', pathRewrite: {'/dev': '/'}}))
app.use('/static', proxy({target: 'http://localhost:3000'}))

const plotpoints = [
  {
    "start_time": "2017-11-29T04:56:12Z",
    "status": "pass",
    "duration": 126
  },

  {
    "start_time": "2017-11-30T03:22:12Z",
    "status": "error",
    "duration": 500
  },

  {
    "start_time": "2017-11-28T03:22:12Z",
    "status": "error",
    "duration": 205
  },

  {
    "start_time": "2017-11-28T02:24:12Z",
    "status": "fail",
    "duration": 20
  },

  {
    "start_time": "2017-11-28T05:24:12Z",
    "status": "pass",
    "duration": 90
  },

  {
    "start_time": "2017-11-29T06:24:12Z",
    "status": "error",
    "duration": 90
  },

  {
    "start_time": "2017-11-28T14:12:12Z",
    "status": "pass",
    "duration": 200
  }
]

app.get('/data', (req, res) => {
  const ans = [

  ].concat(plotpoints)
  res.json(ans)
})

const PORT = 4000
app.listen(PORT, () => console.log("listening on " + PORT))
