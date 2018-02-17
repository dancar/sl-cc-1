import React from 'react'
import Measure from 'react-measure'

const BASE_LABEL_HEIGHT = 40
export default class YAxis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: -1
    }
  }

  render () {
    const height = this.props.height
    if (! height > 0) {
      return []
    }
    const labelsCount = Math.floor(height / BASE_LABEL_HEIGHT)
    const labelStep = this.props.maxDuration / labelsCount
    const labels = [...Array(labelsCount).keys()].map(index => {
      const value = index * labelStep
      const top = value * height / this.props.maxDuration
      return [(
        <line
          stroke="black"
          key={"line_" + index}
          y1={top}
          y2={top}
          x1={0}
          x2={this.props.width}
          >
        </line>
      ), (
        <text x={0} y={top - 2}>
          {value}
        </text>
      )]
    })
    return labels
  }
}
