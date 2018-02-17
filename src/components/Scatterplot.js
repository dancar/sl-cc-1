import React from 'react'
import './Scatterplot.css'
import Measure from 'react-measure'
import Surface from './Surface'
import YAxis from './YAxis'

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
        <YAxis maxDuration={this.state.maxDuration}/>
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
