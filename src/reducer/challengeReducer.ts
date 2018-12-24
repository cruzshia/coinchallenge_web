import { Action } from '@Src/typing/globalTypes'
import {
  SET_CAHLLENGE,
  SET_CAHLLENGE_SPONSERS,
  SetSponserProp
} from '@Epics/challengeEpic/action'
import { ChallengeType, Sponsor } from '@Src/typing/globalTypes'
import { Record, RecordOf } from 'immutable'

export type ChallengeState = {
  sponsers: Array<Sponsor>
} & ChallengeType

export type ChallengeStateType = RecordOf<ChallengeState>

const mockData = {
  completeDays: 0,
  targetDays: 0,
  totalDays: 20,
  startDayTimestamp: 1545221927571,
  sponserSize: 0
} as ChallengeType

const stateMaker = Record<ChallengeState>({
  ...mockData,
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
      return state.set('sponsers', payload.sponsors)
    default:
      return state
  }
}

export default challengeReducer
