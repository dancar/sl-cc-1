import React from 'react'

const FILL_COLOR_BY_STATUS = {
  pass: "#A1C188", // green,
  error: "#CD8D67", // orange
  fail: "#D34961" // red
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
      return []
    }
    const timespan = this.props.maxTime - this.props.minTime

    const points = data.map( (point, index) => {
      const top = height - (point.duration * height / maxDuration)
      const timeOffset = point.timestamp - minTime
      const left = leftOffset + timeOffset * width / timespan
      let radius = 5

      let pointClassName = "scatterplot-point"
      if (point.selected) {
        radius = 8
        pointClassName += " scatterplot-point-selected"
      }

      return (
        <circle key={"point_" + index}
                className={pointClassName}
                cx={left}
                cy={top}
                fill={FILL_COLOR_BY_STATUS[point.status]}
                onClick={() => this.props.onPointClicked(point, index)}
                r={radius} />
      )
    })
    return points
  }
}
