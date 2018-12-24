import { ChallengeType } from '@Src/typing/globalTypes'
import { Sponsor } from '@Src/typing/globalTypes'

interface GetChallengeProp {
  groupId: string
  challenger: string
}

export interface SetSponserProp {
  sponsors: Array<Sponsor>
}

interface SponserProp {
  groupId: string
  who: string
  comment: string
}

export const GET_CAHLLENGE = 'GET_CAHLLENGE'
export const SET_CAHLLENGE = 'SET_CAHLLENGE'
export const SET_CAHLLENGE_SPONSERS = 'SET_CAHLLENGE_SPONSERS'
export const SPONSER_CHALLENGE = 'SPONSER_CHALLENGE'
export const SET_SPONSER_RESULT = 'SET_SPONSER_RESULT'

export const sponserChallenge = (payload: SponserProp) => ({
  type: SPONSER_CHALLENGE,
  payload
})

export const setSponserResult = (payload: any) => ({
  type: SET_SPONSER_RESULT,
  payload
})

export const getChallenge = (payload: GetChallengeProp) => ({
  type: GET_CAHLLENGE,
  payload
})

export const setChallenge = (payload: ChallengeType) => ({
  type: SET_CAHLLENGE,
  payload
})

export const setChallengeSponsers = (payload: SetSponserProp) => ({
  type: SET_CAHLLENGE_SPONSERS,
  payload
})
