import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { ChallengeGroupType } from '../../typing/globalTypes'

import store from '../../store'
import Home from '@Container/Home'

// const challengeGroup = {
//   id: 'com.1secspeed.walking',
//   minDays: 12,
//   maxDays: 30,
//   maxDelayDays: 20,
//   minAmount: 1001
// } as ChallengeGroupType

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={() => <div>about</div>} />
            <Route path="/users/" component={() => <div>users</div>} />
          </React.Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App
