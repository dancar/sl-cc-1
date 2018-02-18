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

  formatLabel (value) {
    if (this.props.maxDuration > 90) {
      return (value / 60) + " min."
    }
    return value + " s."
  }

  render () {
    const height = this.props.height
    if (! height > 0) {
      return []
    }

    const maxPossibleLabels = Math.floor(height / BASE_LABEL_HEIGHT) + 1
    const labelStep = Math.min(
      ...AVAILABLE_SCALE_TICS_IN_SECONDS.filter(
        tics => Math.floor(this.props.maxDuration / tics) <= maxPossibleLabels))
    const labelsCount = Math.ceil(this.props.maxDuration / labelStep)
    const labels = [...Array(labelsCount).keys()].map(index => {
      const value = index * labelStep
      const top = height - (value * height / this.props.maxDuration)
      return [(
        <line
          stroke="whitesmoke"
          key={"line_" + index}
          y1={top}
          y2={top}
          x1={this.props.yAxisWidth}
          x2={this.props.width}
          >
        </line>
      ), (
        <text
          key={"text_" + index}
          x={0} y={top - 2}>
          { this.formatLabel(value) }
        </text>
      )]
    })
    return labels
  }
}
