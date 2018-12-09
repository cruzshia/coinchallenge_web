import { combineEpics } from 'redux-observable'
import commonEpics from './commonEpics'

export default combineEpics(
  ...commonEpics
);