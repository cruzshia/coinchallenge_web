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
      const { response, error } = action.payload as ChallengeGroupState
      return state.merge({
        response,
        error
      })

    default:
      return state
  }
}

export default challengeGroupReducer
