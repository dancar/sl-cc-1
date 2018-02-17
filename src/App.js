import React, { Component } from 'react'
import Scatterplot from './components/Scatterplot'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Interactive Scatterplot Component</h1>
        </header>
        <Scatterplot />
      </div>
    )
  }
}

export default App
