import React from 'react'

const LABEL_HEIGHT = 30
const POSSIBLE_SCALE_STEPS = [1, 15, 30, 60] // in seconds

export default class YAxis extends React.Component {
  formatLabel (value) {
    if (this.props.maxDuration > 90) {
      const minutes = this.pad(Math.floor(value / 60))
      const seconds = this.pad(value - (60 * minutes))
      return `${minutes}:${seconds}`
    }
    return value + ' s.'
  }

  pad (num) {
    return num < 9 ? '0' + num : num
  }

  render () {
    const { padding } = this.props
    const height = this.props.height - (2 * padding)
    if (!height > 0) {
      return []
    }

    const maxPossibleLabels = Math.ceil(height / LABEL_HEIGHT) + 1
    const labelStep = Math.min(
      ...POSSIBLE_SCALE_STEPS.filter(
        tics => Math.floor(this.props.maxDuration / tics) <= maxPossibleLabels))
    const labelsCount = Math.ceil(this.props.maxDuration / labelStep)
    const labels = [...Array(labelsCount).keys()].map(index => {
      const value = index * labelStep
      const top = padding + height - (value * height / this.props.maxDuration)
      return [(
        <line
          stroke='whitesmoke'
          key={'line_' + index}
          y1={top}
          y2={top}
          x1={this.props.yAxisWidth}
          x2={this.props.width - padding}
           />
      ), (
        <text
          key={'text_' + index}
          x={padding} y={top - 2}>
          { this.formatLabel(value) }
        </text>
      )]
    })
    return labels
  }
}
