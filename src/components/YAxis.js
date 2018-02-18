import React from 'react'

const BASE_LABEL_HEIGHT = 30
const AVAILABLE_SCALE_TICS_IN_SECONDS = [1, 15, 30, 60]
export default class YAxis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: -1
    }
  }

  pad (num) {
    return num < 9 ? '0' + num : num
  }

  formatLabel (value) {
    if (this.props.maxDuration > 90) {
      const minutes = this.pad(Math.floor(value / 60))
      const seconds = this.pad(value - (60 * minutes))
      return `${minutes}:${seconds}`
    }
    return value + ' s.'
  }

  render () {
    const { padding } = this.props
    const height = this.props.height - (2 * padding)
    if (!height > 0) {
      return []
    }

    const maxPossibleLabels = Math.ceil(height / BASE_LABEL_HEIGHT) + 1
    const labelStep = Math.min(
      ...AVAILABLE_SCALE_TICS_IN_SECONDS.filter(
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
