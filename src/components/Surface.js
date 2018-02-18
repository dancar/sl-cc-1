import React from 'react'

const FILL_COLOR_BY_STATUS = {
  pass: '#A1C188', // green,
  error: '#CD8D67', // orange
  fail: '#D34961' // red
}

const NORMAL_POINT_RADIUS = 5
const SELECTED_POINT_RADIUS = 8

export default class Surface extends React.Component {
  render () {
    const { data, leftOffset, width, height, minTime, maxDuration, padding } = this.props
    const timespan = this.props.maxTime - this.props.minTime
    const points = data.map((point, index) => {
      const top = height - padding - (point.duration * (height - (2 * padding)) / maxDuration)
      const timeOffset = point.timestamp - minTime
      const left = padding + leftOffset + timeOffset * (width - (2 * padding)) / timespan
      let radius = NORMAL_POINT_RADIUS

      let pointClassName = 'scatterplot-point'
      if (point.selected) {
        radius = SELECTED_POINT_RADIUS
        pointClassName += ' scatterplot-point-selected'
      }

      return (
        <circle key={'point_' + index}
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
