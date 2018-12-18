import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { styled } from '@material-ui/styles'
import store from '@Src/store'
import Home from '@Container/Home'
import NewChallengeGroup from '@Container/NewChallengeGroup'
import Challenge from '@Container/Challenge'

import TranslateHoc from '@Src/translation'
import 'reset-css'
import './app.css'

const { REACT_APP_THEME, REACT_APP_SUB_THEME } = process.env

const Body = styled('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  background: `linear-gradient(45deg, ${REACT_APP_THEME} 30%, ${REACT_APP_SUB_THEME} 90%)`,
  minHeight: '100vh'
})

const MainContainer = styled('div')({
  margin: '0 auto',
  paddingTop: 60
})

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Body>
            <MainContainer>
              <Home />
              <Switch>
                <Route path='/' exact component={NewChallengeGroup} />
                <Route
                  path='/challenge/:groupId/:address'
                  component={Challenge}
                />
                <Route component={() => <Redirect to='/' />} />
              </Switch>
            </MainContainer>
          </Body>
        </Router>
      </Provider>
    )
  }
}

export default TranslateHoc(App)
