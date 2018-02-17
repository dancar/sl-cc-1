import React from 'react'
import './Scatterplot.css'
import ResizeAware from 'react-resize-aware'
import Surface from './Surface'
import YAxis from './YAxis'
import XAxis from './XAxis'

const DATA_PATH = '/data-random'
// const DATA_PATH = '/data'
const STATUS_ERROR = "Failed fetching data from backend."
const STATUS_FETCHING = "Fetching data..."
const STATUS_INIT = "Initializing..."
const STATUS_OK = "ok"
const STATUS_NO_DATA = "No data."

export default class Scatterplot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: STATUS_INIT,
      data: null
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData () {
    this.setState({
      status: STATUS_FETCHING
    }, () => {
      fetch(`${this.props.backend}${DATA_PATH}`)
        .then( (response) => {
          if (response.status >= 400) {
            throw new Error("Bad response :(")
          }
          return response.json()
        })

        .then((data) => {
          data.map(item => console.log(item))
          this.processData(data)
        })

        .catch((error) => {
          this.setState({status: STATUS_ERROR})
        })

    })
  }

  processData (rawData) {
    if (rawData.length === 0 ) {
      this.setState({
        status: STATUS_NO_DATA
      })
    }

    let maxDuration = rawData[0].duration
    let minDuration = maxDuration
    let maxTime = Date.parse(rawData[0].start_time)
    let minTime = maxTime

    const data = rawData.map(({start_time, status, duration}) => {
      maxDuration = Math.max(maxDuration, duration)
      minDuration = Math.min(minDuration, duration)

      const timestamp = Date.parse(start_time)
      maxTime = Math.max(maxTime, timestamp)
      minTime = Math.min(minTime, timestamp)
      return {timestamp, status, duration}
    })

    this.setState({
      status: STATUS_OK,
      maxDuration, minDuration,
      maxTime, minTime,
      data
    })

  }

  handlePointClicked (point, pointIndex) {
    const data = this.state.data.map( (item, index) => {
      if (pointIndex === index) {
        return {
          ...item,
          selected: !item.selected
        }
      }
      return item
    })
    this.setState({data})
  }

  handleResize () {
    this.setState({
      height: this.el.clientHeight,
      width: this.el.clientWidth
    })
  }

  render () {
    const yAxisWidth = 100
    const xAxisHeight = 100

    const statusOk = this.state.status === STATUS_OK
    if (!statusOk) {
      return this.state.status
    }

    if (this.state.data.length === 0) {
      return "No data :("
    }

    return (
      <ResizeAware
        style={{position: 'relative', height: "100%", width: "100%"}}
        onlyEvent
        onResize={this.handleResize.bind(this)}
        >
      <div className="scatterplot-container"
           ref={ (el) => this.el = el}
           >
        <svg height={this.state.height}
             width={this.state.width}
             >
          <YAxis
            maxDuration={this.state.maxDuration}
            width={yAxisWidth}
            height={this.state.height - xAxisHeight}
            />

          <Surface
            data={this.state.data}
            maxDuration={this.state.maxDuration}
            minTime={this.state.minTime}
            maxTime={this.state.maxTime}
            onPointClicked={this.handlePointClicked.bind(this)}
            height={this.state.height - xAxisHeight}
            width={this.state.width - yAxisWidth}
            leftOffset={yAxisWidth}
            />

          <XAxis
            minTime={this.state.minTime}
            maxTime={this.state.maxTime}
            height={xAxisHeight}
            width={this.state.width - yAxisWidth}
            leftOffset={yAxisWidth}
            topOffset={this.state.height - xAxisHeight}
            />
        </svg>
      </div>
      </ResizeAware>
    )
  }
}
