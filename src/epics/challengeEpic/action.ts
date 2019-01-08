import { ChallengeType } from '@Src/typing/globalTypes'
import { Sponsor } from '@Src/typing/globalTypes'
import { Dispatch } from 'redux'

interface GetChallengeProp {
  groupId: string
  challenger: string
}

export interface SetGroupProp {
  groupName: string
  groupImage: string
}

export interface SetSponserProp {
  sponsors: Array<Sponsor>
}

export interface SponserProp {
  groupId: string
  who: string
  comment: string
  amount: number
  dispatch?: Dispatch
}

export interface SetConfirmSponsor {
  isCofirmingSponsor: boolean
  txhash: string
}

export const GET_CAHLLENGE = '@CAHLLENGE/GET_CAHLLENGE'
export const SET_CAHLLENGE = '@CAHLLENGE/SET_CAHLLENGE'
export const SET_CAHLLENGE_GROUP = '@CAHLLENGE/SET_CAHLLENGE_GROUP'
export const SET_CAHLLENGE_SPONSERS = '@CAHLLENGE/SET_CAHLLENGE_SPONSERS'
export const SPONSER_CHALLENGE = '@CAHLLENGE/SPONSER_CHALLENGE'
export const SET_COFIRM_SPONSOR = '@CAHLLENGE/SET_COFIRM_SPONSOR'

export const sponserChallenge = (payload: SponserProp) => ({
  type: SPONSER_CHALLENGE,
  payload
})

export const setChallengeGroup = (payload: SetGroupProp) => ({
  type: SET_CAHLLENGE_GROUP,
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

export const setConfirmSponsor = (payload: SetConfirmSponsor) => ({
  type: SET_COFIRM_SPONSOR,
  payload
})
