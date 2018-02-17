import React from 'react'
import Measure from 'react-measure'

const FILL_COLOR_BY_STATUS = {
  pass: "green",
  error: "orange",
  fail: "red"
}

export default class Surface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
    }
  }

  render () {
    const { data, leftOffset, width, height, minTime, maxDuration} = this.props
    if (! (height && width) ) {
      console.log('<-DANDEBUG-> Surface.js\\ 28: <here>');
      return []
    }
    const timespan = this.props.maxTime - this.props.minTime
    const points = data.map( (point, index) => {
      const top = (point.duration * height / maxDuration)
      const timeOffset = point.timestamp - minTime
      const left = leftOffset + timeOffset * width / timespan
      console.log('<-DANDEBUG-> Surface.js\\ 30: left:', left);
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
}
