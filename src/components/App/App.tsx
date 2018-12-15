import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@Src/store'
import Home from '@Container/Home'
import NewChallengeGroup from '@Container/NewChallengeGroup'
import Challenge from '@Container/Challenge'

import TranslateHoc from '@Src/translation'
import 'reset-css'
import './app.css'

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Home />
            <Switch>
              <Route path='/' exact component={NewChallengeGroup} />
              <Route
                path='/challenge/:address/:groupId'
                component={Challenge}
              />
              <Route component={() => <Redirect to='/' />} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    )
  }
}

export default TranslateHoc(App)
