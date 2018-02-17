import React, { Component } from 'react'
import Scatterplot from './components/Scatterplot'
import './App.css'

const plotpoints = []
const BACKEND = "http://localhost:4000"
class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Interactive Scatterplot Component</h1>
        </header>
        <div
          style={{height: 350, padding: 20, background: "darkgray"}}>
          <Scatterplot backend={BACKEND} />
        </div>
      </div>
    )
  }
}

export default App
