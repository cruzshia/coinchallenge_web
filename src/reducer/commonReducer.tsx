import { Action, FETCH_DATA_DONE } from '../action/common'
import { Record, RecordOf } from 'immutable'

export type commonState = {
  userAddress: string
}

export type commonStateType = RecordOf<commonState>

const stateMaker = Record<commonState>({
  userAddress: '0xwqeqwescefglnk'
})

const initialState = stateMaker()

const commonReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_DATA_DONE:
    // return state.set('isLogin', true)

    default:
      return state
  }
}

export default commonReducer
