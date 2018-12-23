import React from 'react'
import { CommonStateType } from '@Reducers/commonReducer'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { initContract } from '@Epics/commonEpic/action'
import Header from '@Components/Header'
import styled from 'styled-components'
import nodeWindowPolyfill from 'node-window-polyfill'
nodeWindowPolyfill.register()

const StyledParticle = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

const mapStateToProps = (state: Map<string, object>) => {
  return {
    data: state.get('common') as CommonStateType
  }
}

const mapDispatchToProps = (dispath: Dispatch) => ({
  initContract: () => dispath(initContract())
})

interface Props {
  data: CommonStateType
  initContract: () => void
}

class Home extends React.Component<Props> {
  public async componentDidMount() {
    this.props.initContract()
    if (process.env.browser) {
      require('particles.js')
      window.particlesJS.load('particle-body', '/particlesjs-config.json')
    }
  }

  render() {
    return (
      <React.Fragment>
        <StyledParticle id='particle-body' />
        <Header title='CoinChallenges' />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
