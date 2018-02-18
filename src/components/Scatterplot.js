import React from 'react'
import './Scatterplot.css'
import sizeMe from 'react-sizeme'

import Surface from './Surface'
import YAxis from './YAxis'
import XAxis from './XAxis'
import Toolbar from './Toolbar'

const DATA_PATH_BY_SOURCE = {
  random: '/data-random',
  jsonFile: '/data'
}

const SVG_PADDING = 20 // pixels

const STATUS_ERROR = "Failed fetching data from backend."
const STATUS_FETCHING = "Fetching data..."
const STATUS_INIT = "Initializing..."
const STATUS_OK = "ok"
const STATUS_NO_DATA = "No data."

export class Scatterplot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: STATUS_INIT,
      data: null
    }
  }

  componentDidMount () {
    this.fetchData({
      source: "jsonFile",
      from: new Date(0),
      to: new Date()
    })
  }

  fetchData ({from, to, source}) {
    this.setState({
      status: STATUS_FETCHING
    }, () => {
      fetch(`${this.props.backend}${DATA_PATH_BY_SOURCE[source]}?from=${from.toISOString()}&to=${to.toISOString()}`)
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
      return
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
    console.log("Point clicked:" , point)
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

  handleResize ({width, height}) {
    this.setState({
      height,
      width
    })
  }

  render () {

    // TODO: something else?
    const yAxisWidth = 100
    const xAxisHeight = 120
    const toolbarHeight = 30

    const {width, height} = this.props.size
    const svgHeight = height - toolbarHeight

    const statusOk = (this.state.status === STATUS_OK
                      || ( this.state.status === STATUS_NO_DATA )
                      || ( this.state.status === STATUS_FETCHING && this.state.data ))
    if (!statusOk) {
      return (
        <div className="scatterplot-container">
          { this.state.status }
        </div>
      )
    }

    return (
      <div className="scatterplot-container"
           >
        <Toolbar
          onRefresh={this.fetchData.bind(this)}
          height={toolbarHeight}/>
        { this.state.status === STATUS_OK && (
        <svg height={svgHeight} width={width} >
          <YAxis
            padding={SVG_PADDING}
            maxDuration={this.state.maxDuration}
            width={width}
            yAxisWidth={yAxisWidth}
            height={svgHeight - xAxisHeight}
            />

          <Surface
            padding={SVG_PADDING}
            data={this.state.data}
            maxDuration={this.state.maxDuration}
            minTime={this.state.minTime}
            maxTime={this.state.maxTime}
            onPointClicked={this.handlePointClicked.bind(this)}
            height={svgHeight - xAxisHeight}
            width={width - yAxisWidth}
            leftOffset={yAxisWidth}
            />

          <XAxis
            padding={SVG_PADDING}
            minTime={this.state.minTime}
            maxTime={this.state.maxTime}
            height={xAxisHeight}
            width={width - yAxisWidth}
            leftOffset={yAxisWidth}
            topOffset={svgHeight - xAxisHeight}
            />
        </svg>
        )}
      { this.state.status === STATUS_NO_DATA && (
        <div className="scatterplot-nodata" style={{top: svgHeight/2}}>
          No Data
        </div>
      )}
      </div>
    )
  }
}

export default sizeMe({
  refreshRate: 20,
  monitorHeight: true,
  monitorWidth: true})(Scatterplot)
// export default Scatterplot
