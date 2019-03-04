import React, { Component } from 'react'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Home from '@Container/Home'
import Landing from '@Components/Landing'
import CreateChallengeGroup from '@Container/CreateChallengeGroup'
import Challenge from '@Container/Challenge'

import TranslateHoc from '@Src/translation'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'
import { APP_FONT_COLOR, APP_THEME } from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
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
  paddingTop: 60,
  [`@media (max-width: ${breakPoint})`]: {
    paddingTop: 50
  }
})

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
              <Route
                path='/group/create'
                exact
                component={CreateChallengeGroup}
              />
              <Route
                path='/challenge/:groupId/:address/:round?'
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
