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
    const { width, height } = this.state.dimensions
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

  handleResize (contentRect) {
    this.setState({dimensions: contentRect.bounds})
  }

  render () {
    const { width, height } = this.state.dimensions
    return (
      <div style={{backgroud: "yellow", width: "100%", height: "100%"}}>
        <Measure bounds onResize={this.handleResize.bind(this)} >
          { ({ measureRef }) =>
            (
              <svg width={width} height={height} ref={measureRef} className="scatterplot-surface">{ this.renderPoints()}</svg>
            )
          }
      </Measure>
        </div>

    )
  }
}
