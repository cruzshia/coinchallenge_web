import Web3 from 'web3'

export const INIT_CONTRACT = 'INIT_CONTRACT'
export const SET_CONTRACT = 'SET_CONTRACT'

export const SET_POPUP = 'SET_POPUP'

export const initContract = () => ({ type: INIT_CONTRACT })

export const setContract = (payload: {
  contract: Web3 | null
  userAddress: string | null
  accounts?: Array<string>
  error: object | null
}) => ({
  type: SET_CONTRACT,
  payload
})

export interface SetPopProps {
  popMessage?: string
  showPop: boolean
}

export const setPopup = (payload: SetPopProps) => ({
  type: SET_POPUP,
  payload: {
    popMessage: payload.popMessage || '',
    showPop: payload.showPop
  }
})
