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
          <div id='body'>
            <Home />
            <Switch>
              <Route path='/' exact component={NewChallengeGroup} />
              <Route
                path='/challenge/:groupId/:address'
                component={Challenge}
              />
              <Route component={() => <Redirect to='/' />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default TranslateHoc(App)
