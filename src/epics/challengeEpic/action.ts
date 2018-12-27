import { ChallengeType } from '@Src/typing/globalTypes'
import { Sponsor } from '@Src/typing/globalTypes'

interface GetChallengeProp {
  groupId: string
  challenger: string
}

export interface SetSponserProp {
  sponsors: Array<Sponsor>
}

export interface SponserProp {
  groupId: string
  who: string
  comment: string
  amount: number
}

export const GET_CAHLLENGE = 'GET_CAHLLENGE'
export const SET_CAHLLENGE = 'SET_CAHLLENGE'
export const SET_CAHLLENGE_SPONSERS = 'SET_CAHLLENGE_SPONSERS'
export const SPONSER_CHALLENGE = 'SPONSER_CHALLENGE'

export const sponserChallenge = (payload: SponserProp) => ({
  type: SPONSER_CHALLENGE,
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
