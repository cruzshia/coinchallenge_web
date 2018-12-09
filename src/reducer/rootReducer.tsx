import { combineReducers } from 'redux-immutable'
import commonReducer from './commonReducer'
import { Reducer } from 'redux'

const rootReducer: Reducer = combineReducers({
  commonReducer
})

export default rootReducer