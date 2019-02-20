import Contract from 'web3/eth/contract'

export const INIT_CONTRACT = '@COMMON/INIT_CONTRACT'
export const SET_CONTRACT = '@COMMON/SET_CONTRACT'

export const SET_POPUP = '@COMMON/SET_POPUP'
export const CHECK_WALLET = '@COMMON/CHECK_WALLET'

export const SET_CONFIRM = '@COMMON/SET_CONFIRM'

export const GET_BALANCE = '@COMMON/GET_BALANCE'
export const SET_BALANCE = '@COMMON/SET_BALANCE'

export const WITHDRAW_BALANCE = '@COMMON/WITHDRAW_BALANCE'
export const SET_WITHRAW_RESULT = '@COMMON/SET_WITHRAW_RESULT'

export const initContract = () => ({ type: INIT_CONTRACT })

export const setContract = (payload: {
  txContract: Contract | null
  contract: Contract | null
  userAddress: string | null
  accounts?: Array<string>
  accountBalance: string
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

export const getBalance = () => ({
  type: GET_BALANCE
})

export const setBalance = (balance: string) => ({
  type: SET_BALANCE,
  payload: {
    balance
  }
})

export const withdrawBalance = () => ({
  type: WITHDRAW_BALANCE
})
