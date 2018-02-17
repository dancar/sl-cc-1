import React from 'react'
import Measure from 'react-measure'
import moment from 'moment'

const BASE_LABEL_WIDTH = 110
export default class XAxis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: -1
    }
  }

  render () {
    if (!this.props.width) {
      return []
    }
    const topOffset = this.props.topOffset
    console.log('<-DANDEBUG-> XAxis.js\\ 18: topOffset:', topOffset);
    const labelsCount = Math.floor(this.props.width / BASE_LABEL_WIDTH)
    const timespan = this.props.maxTime - this.props.minTime
    const labelStep = timespan / labelsCount
    const labels = [...Array(labelsCount).keys()].map(index => {
      const value = index * labelStep
      const left = this.props.leftOffset + value * this.props.width / timespan
      const time = moment(this.props.minTime + value)
      const date = time.format("YYYY-MM-DD")
      const hour = time.format("HH:mm:ss")

      return [(
        <line
          stroke="black"
          key={"line_" + index}
          y1={topOffset}
          y2={topOffset + 20}
          x1={left}
          x2={left}
          >
        </line>
      ), (
        <text x={left} y={topOffset + 30}>
          { date }
        </text>
      ), (
        <text x={left} y={topOffset + 50}>
          { hour }
        </text>
      )]
    })
    return labels
  }
}
