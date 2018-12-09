import React from 'react'
import { commonStateType } from '../../reducer/commonReducer'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchData } from '../../action/common'

const mapStateToProps = (state: Map<string, commonStateType>) => {
  return {
    data: state.get('commonReducer') as commonStateType
  }
}

const mapDispatchToProps = (dispath: Dispatch) => ({
  fetchData: () => dispath(fetchData())
})

interface Props {
  data: commonStateType
  fetchData: Function
}

class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return <div>this is home</div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
