import { combineEpics } from 'redux-observable'
import commonEpics from './commonEpic'
import challengeGroupEpics from './challengeGroupEpic'
import challengeEpics from './challengeEpic'

export default combineEpics(
  ...commonEpics,
  ...challengeGroupEpics,
  ...challengeEpics
)
