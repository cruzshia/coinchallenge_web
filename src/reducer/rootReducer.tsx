import { combineReducers } from 'redux-immutable'
import commonReducer from './commonReducer'
import { Reducer } from 'redux'

const rootReducer: Reducer = combineReducers({
  common: commonReducer
})

export default rootReducer
