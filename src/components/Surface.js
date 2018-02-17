import React from 'react'
import Measure from 'react-measure'

const FILL_COLOR_BY_STATUS = {
  pass: "green",
  error: "orange",
  fail: "red"
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

  renderPoints () {
    const { width, height } = this.state
    const timespan = this.props.maxTime - this.props.minTime
    const points = this.props.data.map( (point, index) => {
      const top = (point.duration * height / this.props.maxDuration)
      const timeOffset = point.timestamp - this.props.minTime
      const left = timeOffset * width / timespan
      let pointClassName = "scatterplot-point"
      if (point.selected) {
        pointClassName += " scatterplot-point-selected"
      }

      return (
        <circle key={"point_" + index}
                className={pointClassName}
                cx={left}
                cy={top}
                fill={FILL_COLOR_BY_STATUS[point.status]}
                onClick={() => this.props.onPointClicked(point, index)}
                r={4} />
      )
    })
    return points
  }

  componentDidMount () {
    this.setState({
      width: this.el.clientWidth,
      height: this.el.clientHeight
    })
  }

  render () {
    const { width, height } = this.state.dimensions
    return (
      <div className="scatterplot-surface" ref={el => this.el = el} >
        <svg width={this.state.width} height={this.state.height}
             >{this.renderPoints()}</svg>
      </div>

    )
  }
}
