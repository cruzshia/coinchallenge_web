import React from 'react'
import { CommonStateType } from '@Reducers/commonReducer'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { initContract } from '@Epics/commonEpic/action'
import Header from '@Components/Header'

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
  }

  render() {
    return (
      <React.Fragment>
        <Header title='CoinChallenges' />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
