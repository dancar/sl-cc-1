import React from 'react'
import './Scatterplot.css'
import Measure from 'react-measure'
import Surface from './Surface'
import YAxis from './YAxis'
import XAxis from './XAxis'

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

  componentDidMount () {
    this.setState({
      height: this.el.clientHeight,
      width: this.el.clientWidth
    })
  }

  render () {
    const yAxisWidth = 100
    const xAxisHeight = 100

    return (
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
    )
  }
}
