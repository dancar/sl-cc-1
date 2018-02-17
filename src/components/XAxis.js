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

  renderLabels () {
    const width = this.state.width
    console.log('<-DANDEBUG-> XAxis.js\\ 15: width:', width);
    if (width < 0) {
      return []
    }
    const labelsCount = Math.floor(width / BASE_LABEL_WIDTH)
    const timespan = this.props.maxTime - this.props.minTime
    const labelStep = timespan / labelsCount
    const labels = [...Array(labelsCount).keys()].map(index => {
      const value = index * labelStep
      const left = value * width / timespan
      const time = moment(this.props.minTime + value)
      const date = time.format("YYYY-MM-DD")
      const hour = time.format("HH:mm:ss")

      return [(
        <line
          stroke="black"
          key={"line_" + index}
          y1={0}
          y2={20}
          x1={left}
          x2={left}
          >
        </line>
      ), (
        <text x={left} y={30}>
          { date }
        </text>
      ), (
        <text x={left} y={50}>
          { hour }
        </text>
      )]
    })
    return labels
  }

  componentDidMount () {
    const width = this.el.clientWidth
    this.setState({width})
  }

  render () {
    const width = this.state.width
    return (
      <div ref={el => this.el=el} >

        <svg width={width} height={40}>
        { this.renderLabels() }
        </svg>
      </div>
    )
  }
}
