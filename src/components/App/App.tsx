import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { Provider } from 'react-redux'
import styled from 'styled-components'
// import store from '@Src/store'
import Home from '@Container/Home'
import CreateChallengeGroup from '@Container/CreateChallengeGroup'
import Challenge from '@Container/Challenge'

import TranslateHoc from '@Src/translation'
import { APP_FONT_COLOR } from '@Src/contants/themeColor'
import 'reset-css'
import './app.css'

const Body = styled('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  background: APP_FONT_COLOR,
  minHeight: '100vh'
})

const MainContainer = styled('div')({
  margin: '0 auto 40px',
  paddingTop: 60
})

class App extends Component {
  public render() {
    return (
      <Body>
        <MainContainer>
          <Home />
          <Switch>
            <Route path='/' exact component={CreateChallengeGroup} />
            <Route path='/challenge/:groupId/:address' component={Challenge} />
            <Route component={() => <Redirect to='/' />} />
          </Switch>
        </MainContainer>
      </Body>
    )
  }
}

export default TranslateHoc(App)
