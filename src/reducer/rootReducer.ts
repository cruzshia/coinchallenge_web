import { combineReducers } from 'redux-immutable'
import { Reducer } from 'redux'
import commonReducer from './commonReducer'
import challengeGroupReducer from './challengeGroupReducer'
import challengeReducer from './challengeReducer'

const rootReducer: Reducer = combineReducers({
  common: commonReducer,
  challengeGroup: challengeGroupReducer,
  challenge: challengeReducer
})

export default rootReducer
