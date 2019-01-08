import { Action } from '@Src/typing/globalTypes'
import {
  SET_CAHLLENGE_GROUP,
  SET_CAHLLENGE,
  SET_CAHLLENGE_SPONSERS,
  SET_COFIRM_SPONSOR,
  SetGroupProp,
  SetConfirmSponsor,
  SetSponserProp
} from '@Epics/challengeEpic/action'
import { ChallengeType, Sponsor } from '@Src/typing/globalTypes'
import { Record, RecordOf } from 'immutable'

export type ChallengeState = {
  sponsers: Array<Sponsor>
  isCofirmingSponsor: boolean
  txhash: string
  groupName: string
  groupImage: string
} & ChallengeType

export type ChallengeStateType = RecordOf<ChallengeState>
let initState
if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
  initState = window.__PRELOADED_STATE__.challenge
} else {
  initState = {
    completeDays: 0,
    targetDays: 0,
    totalDays: 0,
    startDayTimestamp: 0,
    sponserSize: 0,
    amount: 0
  } as ChallengeType
}

const stateMaker = Record<ChallengeState>({
  sponsers: [],
  isCofirmingSponsor: false,
  txhash: '',
  groupName: '',
  groupImage: '',
  ...initState
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

    case SET_COFIRM_SPONSOR:
      const { isCofirmingSponsor, txhash } = action.payload as SetConfirmSponsor
      return state.merge({
        isCofirmingSponsor,
        txhash
      })
    case SET_CAHLLENGE_GROUP:
      const { groupName, groupImage } = action.payload as SetGroupProp
      return state.merge({
        groupName,
        groupImage
      })
    default:
      return state
  }
}

export default challengeReducer
