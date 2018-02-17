import React from 'react'

export default class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fromDate: new Date(0).toISOString().substring(0, 10),
      toDate: new Date().toISOString().substring(0, 10),
      fromTime: new Date(0).toISOString().substring(11, 16),
      toTime: new Date().toISOString().substring(11, 16)

    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createTimestamp (date, time) {
    return new Date(Date.parse(`${date}T${time}:00.000Z`))
  }

  handleSubmit (e) {
    e.preventDefault()
    const from = this.createTimestamp(this.state.fromDate, this.state.fromTime)
    const to = this.createTimestamp(this.state.toDate, this.state.toTime)
    this.props.onRefresh({from, to})

  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="scatterplot-toolbar" style={{height: this.props.height}}>
        <label>From:</label>
        <input name="fromDate" onChange={this.handleInputChange} value={this.state.fromDate} type="date"/>
        <input name="fromTime" onChange={this.handleInputChange} value={this.state.fromTime} type="time"/>

        <label>To:</label>
        <input name="toDate" onChange={this.handleInputChange} value={this.state.toDate} type="date"/>
        <input name="toTime" onChange={this.handleInputChange} value={this.state.toTime} type="time"/>

        <button type="submit">
          Refresh
        </button>
      </form>
    )
  }
}
