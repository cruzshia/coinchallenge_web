import { Action } from '@Src/typing/globalTypes'
import {
  SET_CAHLLENGE,
  SET_CAHLLENGE_SPONSERS,
  SetSponserProp
} from '@Epics/challengeEpic/action'
import { ChallengeType } from '@Src/typing/globalTypes'
import { Record, RecordOf } from 'immutable'

export type Sponser = {
  who: string
  amount: number
  comment: string
}

export type ChallengeState = {
  error: boolean
  sponsers: Array<Sponser>
} & ChallengeType

export type ChallengeStateType = RecordOf<ChallengeState>

const mockData = {
  completeDays: 8,
  targetDays: 10,
  totalDays: 20,
  startDayTimestamp: 1545221927571,
  sponserSize: 1
} as ChallengeType

const stateMaker = Record<ChallengeState>({
  ...mockData,
  error: false,
  sponsers: []
})

export const initialState = stateMaker()

const challengeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CAHLLENGE:
      return state.merge({
        ...action.payload
      })

    case SET_CAHLLENGE_SPONSERS:
      const payload = action.payload as SetSponserProp
      return state.set('sponsers', payload.sponsers)
    default:
      return state
  }
}

export default challengeReducer
