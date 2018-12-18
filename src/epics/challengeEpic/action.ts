import { ChallengeType } from '@Src/typing/globalTypes'
import { Sponser } from '@Reducers/challengeReducer'

interface GetChallengeProp {
  groupId: string
  challenger: string
}

export interface SetSponserProp {
  sponsers: Array<Sponser>
}

export const GET_CAHLLENGE = 'GET_CAHLLENGE'
export const SET_CAHLLENGE = 'SET_CAHLLENGE'
export const GET_CAHLLENGE_SPONSERS = 'GET_CAHLLENGE_SPONSERS'
export const SET_CAHLLENGE_SPONSERS = 'SET_CAHLLENGE_SPONSERS'

export const getChallenge = (payload: GetChallengeProp) => ({
  type: GET_CAHLLENGE,
  payload
})

export const setChallenge = (payload: ChallengeType) => ({
  type: SET_CAHLLENGE,
  payload
})

export const getChallengeSponsers = (payload: GetChallengeProp) => ({
  type: GET_CAHLLENGE_SPONSERS,
  payload
})

export const setChallengeSponsers = (payload: SetSponserProp) => ({
  type: GET_CAHLLENGE_SPONSERS,
  payload
})
