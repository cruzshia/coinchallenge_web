import { Action } from '@Src/typing/globalTypes'
import { INIT_CONTRACT, setContract } from './action'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { NO_PROVIDER } from '@Src/contants/errorCode'

export const initContractEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(INIT_CONTRACT),
    switchMap(async () => {
      let accounts: string[]
      const errorAction = setContract({
        contract: null,
        userAddress: null,
        error: NO_PROVIDER
      })

      try {
        if (typeof web3 !== 'undefined') {
          web3 = new Web3(
            new Web3.providers.WebsocketProvider('ws://localhost:7545')
          )

          accounts = await web3.eth.getAccounts()
          const contract = new web3.eth.Contract(
            CoinChallengs.abi,
            '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c',
            {
              gas: 4600000
            }
          )
          window.contract = contract
          return setContract({
            contract,
            userAddress: accounts.length ? accounts[0] : null,
            accounts,
            error: null
          })
        } else {
          return errorAction
        }
      } catch (e) {
        return errorAction
      }
    })
  )

export default [initContractEpic]
