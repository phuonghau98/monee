import React, { Component } from 'react'
import Menu from './Menu/Menu'
import Main from './Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Statistics from './Menu/Statistics'
import Setting from './Menu/Settings'
import Plans from './Menu/Plans'

class App extends Component {
  render () {
    return (
      <Router >
        <div className='wrapper'>
          <Menu />
          <Route exact path='/' component={Main} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/plans' component={Plans} />
          <Route path='/settings' component={Setting} />
        </div>
      </Router>
    )
  }
}

export default App
