import Contract from 'web3/eth/contract'

export const INIT_CONTRACT = '@COMMON/INIT_CONTRACT'
export const SET_CONTRACT = '@COMMON/SET_CONTRACT'

export const SET_POPUP = '@COMMON/SET_POPUP'
export const CHECK_WALLET = '@COMMON/CHECK_WALLET'

export const SET_CONFIRM = '@COMMON/SET_CONFIRM'

export const initContract = () => ({ type: INIT_CONTRACT })

export const setContract = (payload: {
  txContract: Contract | null
  contract: Contract | null
  userAddress: string | null
  accounts?: Array<string>
  error: object | null
}) => ({
  type: SET_CONTRACT,
  payload
})

export interface SetPopProps {
  popMessage?: string
  messageKey?: string
  showPop: boolean
}

export const setPopup = (payload: SetPopProps) => ({
  type: SET_POPUP,
  payload: {
    popMessage: payload.popMessage || '',
    messageKey: payload.messageKey || null,
    showPop: payload.showPop
  }
})

export const checkWallet = () => ({ type: CHECK_WALLET })

export interface SetConfirmProp {
  isConfirming: boolean
  txHash?: string
}

export const setConfirm = (payload: SetConfirmProp) => ({
  type: SET_CONFIRM,
  payload
})
