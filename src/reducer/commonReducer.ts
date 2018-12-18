import { Action } from '@Src/typing/globalTypes'
import { SET_CONTRACT } from '@Epics/commonEpic/action'
import Web3 from 'web3'
import { Record, RecordOf } from 'immutable'

export type CommonState = {
  userAddress: string
  contract: Web3 | null
  loading: boolean
  error: {
    code: number
    text: string
  } | null
}

export type CommonStateType = RecordOf<CommonState>

const stateMaker = Record<CommonState>({
  userAddress: '0xwqeqwescefglnk',
  contract: null,
  loading: true,
  error: null
})

interface SetContractPayload {
  contract: Web3 | null
  loading: boolean
  error: {
    code: number
    text: string
  } | null
}

export const initialState = stateMaker()

const commonReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CONTRACT:
      const { contract, error } = action.payload as SetContractPayload
      return state.merge({
        contract,
        loading: false,
        error
      })

    default:
      return state
  }
}

export default commonReducer
