import React, { Component } from 'react'
import Scatterplot from './components/Scatterplot'
import './App.css'

class App extends Component {
  render () {
const plotpoints = [
  {
    "start_time": "2017-11-29T04:56:12Z",
    "status": "pass",
    "duration": 126
  },

  {
    "start_time": "2017-11-28T03:22:12Z",
    "status": "error",
    "duration": 205
  },

  {
    "start_time": "2017-11-28T02:24:12Z",
    "status": "fail",
    "duration": 20
  },

  {
    "start_time": "2017-11-28T05:24:12Z",
    "status": "pass",
    "duration": 90
  },

  {
    "start_time": "2017-11-29T06:24:12Z",
    "status": "error",
    "duration": 90
  },

  {
    "start_time": "2017-11-28T14:12:12Z",
    "status": "pass",
    "duration": 200
  }
]
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Interactive Scatterplot Component</h1>
        </header>
        <div
          style={{height: 450, padding: 20, background: "darkgray"}}>
          <Scatterplot data={plotpoints} />
        </div>
      </div>
    )
  }
}

export default App
