import { Action } from '@Src/typing/globalTypes'
import { SET_CREATE_RESULT } from '@Epics/challengeGroupEpic/action'
import { Record, RecordOf } from 'immutable'

export type ChallengeGroupState = {
  response: object
  error: boolean
}

export type ChallengeGroupStateType = RecordOf<ChallengeGroupState>

const stateMaker = Record<ChallengeGroupState>({
  response: {},
  error: false
})

export const initialState = stateMaker()

const challengeGroupReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CREATE_RESULT:
      return state.merge({
        ...action.payload
      })

    default:
      return state
  }
}

export default challengeGroupReducer
