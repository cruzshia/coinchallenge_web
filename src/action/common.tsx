import Web3 from 'web3'
export interface Action {
  type: string
  payload?: { [s: string]: any }
}

export const INIT_CONTRACT = 'INIT_CONTRACT'
export const SET_CONTRACT = 'SET_CONTRACT'
export const NEW_CHALLENGE_GROUP = 'NEW_CHALLENGE_GROUP'

export const initContract = () => ({ type: INIT_CONTRACT })

export const setContract = (payload: {
  contract: Web3 | null
  isLoading: boolean
}) => ({
  type: SET_CONTRACT,
  payload
})

export const newChallengeGroup = (payload: object) => ({
  type: NEW_CHALLENGE_GROUP,
  payload
})
