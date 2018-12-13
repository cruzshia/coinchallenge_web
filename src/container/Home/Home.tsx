import React from 'react'
import { CommonStateType } from '@Reducers/commonReducer'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { initContract, newChallengeGroup } from '@Action/common'
import Button from '@material-ui/core/Button'

const mapStateToProps = (state: Map<string, object>) => {
  return {
    data: state.get('commonReducer') as CommonStateType
  }
}

const mapDispatchToProps = (dispath: Dispatch) => ({
  initContract: () => dispath(initContract()),
  newChallengeGroup: (data: Object) => dispath(newChallengeGroup(data))
})

interface Props {
  data: CommonStateType
  initContract: () => void
  newChallengeGroup: (data: Object) => void
}

class Home extends React.Component<Props> {
  public async componentDidMount() {
    this.props.initContract()
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
