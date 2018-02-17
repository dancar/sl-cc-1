const fs = require('fs')
const express = require('express')
const proxy = require('http-proxy-middleware')
const randomSeed = require('random-seed')

const SEED = "Wheat"

const app = express()
app.use(express.static('build'))
app.use('/dev', proxy({target: 'http://localhost:3000', pathRewrite: {'/dev': '/'}}))
app.use('/static', proxy({target: 'http://localhost:3000'}))

app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8',
              (err, data) =>
              res.send(JSON.stringify(JSON.parse(data))))
})

app.get('/data-random', (req, res) => {
  const maxDuration = 900
  const maxTimespan = 1000 * 60 * 60 * 24 * 365 * 3 // MAX 3 years
  const maxDataPoints = 3
  const minDataPoints = 3
  const latestDate = new Date('2018-02-17T21:30:53.270Z')
  const rand = randomSeed.create()
  // const rand = randomSeed.create(SEED)

  const startDate = new Date(rand(latestDate.getTime()))
  const endDate = startDate + rand(maxTimespan)
  const dataPointsCount = rand(maxDataPoints - minDataPoints) + minDataPoints
  const ans = [...Array(dataPointsCount)].map( () => {
    return {
      start_time: new Date(startDate.getTime() + rand(maxTimespan)),
      status: ["pass", "fail", "error"][rand(3)],
      duration: rand(maxDuration)
    }
  })
  res.json(ans)


})

const PORT = 4000
app.listen(PORT, () => console.log("listening on " + PORT))
