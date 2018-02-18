const fs = require('fs')
const express = require('express')
const proxy = require('http-proxy-middleware')
const randomSeed = require('random-seed')

const app = express()
app.use(express.static('build'))
app.use('/dev', proxy({target: 'http://localhost:3000', pathRewrite: {'/dev': '/'}}))
app.use('/static', proxy({target: 'http://localhost:3000'}))

function filterByTime (data, req) {
  const from = new Date(Date.parse(req.query.from))
  const to = new Date(Date.parse(req.query.to))
  const ans = data.filter(item => {
    const time = new Date(Date.parse(item.start_time))
    return time >= from && time <= to
  })

  return ans
}

app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8',
              (_, data) =>
              res.json(filterByTime(JSON.parse(data), req)
              ))
})

app.get('/data-random', (req, res) => {
  const maxDuration = 300
  const maxTimespan = 1000 * 60 * 60 * 24 * 365 * 3 // MAX 3 years
  const maxDataPoints = 110
  const minDataPoints = 100
  const latestDate = new Date('2018-02-17T21:30:53.270Z')
  const rand = randomSeed.create()

  const startDate = new Date(rand(latestDate.getTime()))
  const dataPointsCount = rand(maxDataPoints - minDataPoints) + minDataPoints
  const data = [...Array(dataPointsCount)].map(() => {
    return {
      start_time: new Date(startDate.getTime() + rand(maxTimespan)),
      status: ['pass', 'fail', 'error'][rand(3)],
      duration: rand(maxDuration)
    }
  })
  res.json(filterByTime(data, req))
})

const PORT = 4000
app.listen(PORT, () => console.log(`\n\nSL-CC Available at:\n\n\thttp://localhost:${PORT}`))
