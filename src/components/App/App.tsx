import React, { Component } from 'react'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Home from '@Container/Home'
import CreateChallengeGroup from '@Container/CreateChallengeGroup'
import Challenge from '@Container/Challenge'

import TranslateHoc from '@Src/translation'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'
import { APP_FONT_COLOR, APP_THEME } from '@Src/contants/themeColor'
import 'reset-css'
import './app.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: APP_THEME,
      light: APP_THEME,
      dark: APP_THEME
    }
  },
  typography: {
    useNextVariants: true
  }
})

const Body = styled('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  background: APP_FONT_COLOR,
  minHeight: '100vh'
})

const MainContainer = styled('div')({
  margin: '0 auto 40px',
  paddingTop: 60
})

const Landing = () => (
  <div style={{ zIndex: 10, background: 'red' }}>
    <Link to='/create'>CoinChallenges</Link>
  </div>
)

class App extends Component {
  public componentDidMount() {
    const jssStyles = document.getElementById('jss-ssr')
    jssStyles && jssStyles.remove()
  }
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Body>
          <MainContainer>
            <Home />
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/create' exact component={CreateChallengeGroup} />
              <Route
                path='/challenge/:groupId/:address'
                component={Challenge}
              />
              <Route component={() => <Redirect to='/' />} />
            </Switch>
          </MainContainer>
        </Body>
      </MuiThemeProvider>
    )
  }
}

export default withTheme()(withRouter(TranslateHoc(App)))
