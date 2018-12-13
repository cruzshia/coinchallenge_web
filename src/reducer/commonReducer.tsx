import { Action, SET_CONTRACT } from '../action/common'
import Web3 from 'web3'
import { Record, RecordOf } from 'immutable'

export type CommonState = {
  userAddress: string
  contract: Web3 | null
  loading: boolean
  isConnectError: boolean
}

export type CommonStateType = RecordOf<CommonState>

const stateMaker = Record<CommonState>({
  userAddress: '0xwqeqwescefglnk',
  contract: null,
  loading: true,
  isConnectError: false
})

export const initialState = stateMaker()

const commonReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CONTRACT:
      const contract = action.payload && action.payload.contract
      return state.merge({
        contract,
        loading: false
      })

    default:
      return state
  }
}

export default commonReducer
