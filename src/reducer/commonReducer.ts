import { Action } from '@Src/typing/globalTypes'
import {
  SET_CONTRACT,
  SET_POPUP,
  CHECK_WALLET,
  SET_CONFIRM,
  SetPopProps
} from '@Epics/commonEpic/action'
import { GET_CAHLLENGE, SET_CAHLLENGE } from '@Epics/challengeEpic/action'
import {
  CREATE_CHALLENGE_GROUP,
  SET_CREATE_RESULT
} from '@Epics/challengeGroupEpic/action'
import Contract from 'web3/eth/contract'
import { getMetmaskUrl, isDexon } from '@Src/utils'
import { Record, RecordOf } from 'immutable'

export type CommonState = {
  lang: string
  userAddress: string | null
  txContract: Contract | null
  contract: Contract | null
  accounts: Array<string>
  loading: boolean
  showPop: boolean
  popMessage: string
  messageKey: string | null
  isConfirming: boolean
  txHash?: string
  accountBalance: string
  error: {
    code: number
    text: string
  } | null
}

export type CommonStateType = RecordOf<CommonState>

const stateMaker = Record<CommonState>({
  lang: 'en',
  userAddress: null,
  accounts: [],
  txContract: null,
  contract: null,
  loading: true,
  showPop: false,
  popMessage: '',
  messageKey: null,
  isConfirming: false,
  txHash: '',
  error: null,
  accountBalance: '0'
})

interface SetContractPayload {
  txContract: Contract | null
  contract: Contract | null
  userAddress: string | null
  accounts: Array<string>
  loading: boolean
  accountBalance: string
  error: {
    code: number
    text: string
  } | null
}

export const initialState = stateMaker()

const commonReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CONTRACT:
      const {
        txContract,
        contract,
        userAddress,
        accounts = [],
        accountBalance,
        error
      } = action.payload as SetContractPayload
      return state.merge({
        txContract,
        contract,
        userAddress,
        accounts,
        accountBalance,
        loading: false,
        error
      })

    case SET_POPUP:
      const payload = action.payload as SetPopProps
      return state.merge({
        showPop: payload.showPop,
        popMessage: payload.popMessage,
        messageKey: payload.messageKey
      })

    case GET_CAHLLENGE:
    case CREATE_CHALLENGE_GROUP:
      return state.set('loading', true)
    case SET_CAHLLENGE:
    case SET_CREATE_RESULT:
      return state.merge({
        loading: false,
        isConfirming: false
      })
    case CHECK_WALLET:
      if (state.get('txContract') === null) {
        const url = isDexon(action.payload && action.payload.chain)
          ? 'https://dexon.org/faucet'
          : getMetmaskUrl()
        if (state.get('accounts').length === 0) {
          return state.merge({
            showPop: true,
            messageKey: 'accountNotFound'
          })
        }

        if (url) {
          window.open(url)
        } else {
          state = state.merge({
            showPop: true,
            messageKey: 'browserNotSupport'
          })
        }
      }

      return state
    case SET_CONFIRM:
      const { isConfirming, txHash } = action.payload as any
      return state.merge({
        isConfirming,
        txHash
      })
    default:
      return state
  }
}

export default commonReducer
