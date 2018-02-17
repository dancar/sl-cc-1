import React from 'react'
import moment from 'moment'

const BASE_LABEL_WIDTH = 90
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
    const labelsCount = Math.floor(this.props.width / BASE_LABEL_WIDTH)
    const timespan = this.props.maxTime - this.props.minTime
    const labelStep = timespan / labelsCount
    const rotationAngle = 60
    const labels = [...Array(labelsCount).keys()].map(index => {


      const value = index * labelStep
      const left = this.props.leftOffset + value * this.props.width / timespan
      const time = moment(this.props.minTime + value)
      const date = time.format("YYYY-MM-DD")
      const hour = time.format("HH:mm:ss")
      const textTop = topOffset + 25

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
        <text
          key={"text_date_" + index}
          transform={`rotate(${rotationAngle} ${left + 15} ${textTop})`} x={left + 15} y={textTop}>
          { date }
        </text>
      ), (
        <text
          key={"text_hour_" + index}
          transform={`rotate(${rotationAngle} ${left} ${textTop})`} x={left} y={textTop}>
          { hour }
        </text>
      )]
    })
    return labels
  }
}
