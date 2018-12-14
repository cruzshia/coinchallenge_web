import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@Src/store'
import Home from '@Container/Home'
import NewChallengeGroup from '@Container/NewChallengeGroup'

import 'reset-css'
import './app.css'

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Home />
            <Route path='/create_group/' component={NewChallengeGroup} />
            <Route path='/users/' component={() => <div>users</div>} />
          </React.Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App
