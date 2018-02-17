import React from 'react'
import './Scatterplot.css'
import ReacthEcharts from 'echarts-for-react'
import Measure from 'react-measure'

const FILL_COLOR_BY_STATUS = {
  pass: "green",
  error: "orange",
  fail: "red"
}

class Surface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
    }
  }

  renderPoints () {
    const { width, height } = this.state.dimensions
    const timespan = this.props.maxTime - this.props.minTime
    const points = this.props.data.map( (point, index) => {
      const top = (point.duration * height / this.props.maxDuration)
      const timeOffset = point.timestamp - this.props.minTime
      const left = timeOffset * width / timespan
      let pointClassName = "scatterplot-point"
      if (point.selected) {
        pointClassName += " scatterplot-point-selected"
      }

      return (
        <circle key={"point_" + index}
                className={pointClassName}
                cx={left}
                cy={top}
                fill={FILL_COLOR_BY_STATUS[point.status]}
                onClick={() => this.props.onPointClicked(point, index)}
                r={4} />
      )
    })
    return points
  }

  render () {
    const { width, height } = this.state.dimensions
    return (
      <Measure
        bounds
        onResize={(contentRect) => this.setState({dimensions: contentRect.bounds})}
        >
          { ({ measureRef }) =>
            <svg width={width} height={height} ref={measureRef} className="scatterplot-surface">{ this.renderPoints()}</svg>

            }
      </Measure>
    )
  }
}

export default class Scatterplot extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.calcState(props)
  }

  onComponentWillReceiveProps (newProps) {
    // TODO: optimize for changes?
    this.setState(this.calcState(newProps))
  }

  calcState (props) {
    const data = props.data.map(({start_time, status, duration}) => {
      const timestamp = Date.parse(start_time)
      return {timestamp, status, duration}
    })

    const durations = data.map((item) => item.duration)
    const maxDuration = Math.max(...durations)
    const minDuration = Math.min(...durations)

    const timestamps = data.map((item) => item.timestamp)
    const maxTime = Math.max(...timestamps)
    const minTime = Math.min(...timestamps)

    return {
      maxDuration, minDuration,
      maxTime, minTime,
      data
    }

  }

  handlePointClicked (point, pointIndex) {
    console.log('<-DANDEBUG-> Scatterplot.js\\ 98: arguments:', arguments);

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

  render () {
    return (
      <div className="scatterplot-container">
        <div className="scatterplot-yaxis"></div>
        <Surface data={this.state.data}
                 maxDuration={this.state.maxDuration}
                 minTime={this.state.minTime}
                 maxTime={this.state.maxTime}
                 onPointClicked={this.handlePointClicked.bind(this)}
                 />
        <div className="scatterplot-corner"></div>
        <div className="scatterplot-xaxis">
          <div className="scatterplot-x-label" style={{left: "10%"}}>
            bla
          </div>

        </div>
      </div>
    )
  }
}
