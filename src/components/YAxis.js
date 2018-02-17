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

  renderLabels () {
    const height = this.state.height
    const width = 30 // TODO: const / dynamic?
    if (height < 0) {
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
          x2={width}
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

  componentDidMount () {
    const height = this.el.clientHeight
    this.setState({height})
  }

  render () {
    return (
      <svg ref={el => this.el=el}
           style={{background: "white", width: "100%", height: "100%"}}>
        { this.renderLabels() }
      </svg>
    )
  }
}
