import {
  INIT_CONTRACT,
  NEW_CHALLENGE_GROUP,
  Action,
  setContract
} from '@Action/common'
import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'
import Web3 from 'web3'
import CoinChallengs from '../contracts/CoinChallenges.json'
import { ChallengeGroupType } from '../typing/globalTypes'

const initContractEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(INIT_CONTRACT),
    switchMap(async () => {
      let accounts: string[]
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(
          new Web3.providers.WebsocketProvider('ws://localhost:7545')
        )

        accounts = await web3.eth.getAccounts()
        web3.eth.defaultAccount = accounts[0]
        const contract = new web3.eth.Contract(
          CoinChallengs.abi,
          '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c',
          {
            gas: 4600000
          }
        )
        return setContract({
          contract,
          isLoading: false
        })
      } else {
        return setContract({ contract: null, isLoading: false })
      }
    })
  )

const newChallengeGroupEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(NEW_CHALLENGE_GROUP),
    switchMap((action: Action) => {
      const contract = state$.value.get('common').get('contract')
      return from(
        contract.methods.createChallengeGroup(
          ...Object.values(action.payload as ChallengeGroupType)
        )
      ).pipe(map(() => ({ type: 'test' })))
    })
  )

export default [initContractEpic, newChallengeGroupEpic]
