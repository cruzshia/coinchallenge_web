import { Action } from '@Src/typing/globalTypes'
import { INIT_CONTRACT, setContract, setPopup } from './action'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { NO_PROVIDER } from '@Src/contants/errorCode'

function newContract(web3Interface: Web3) {
  return new web3Interface.eth.Contract(
    CoinChallengs.abi,
    '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c',
    {
      gas: 4600000
    }
  )
}

export const initContractEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(INIT_CONTRACT),
    switchMap(async () => {
      let accounts: string[]

      try {
        let injectProvider
        let txContract = null

        if (typeof web3 === 'undefined' || !process.browser) {
          window.web3 = {}
        } else {
          let txWeb3 = new Web3(web3.currentProvider)
          txContract = newContract(txWeb3)
        }

        const providers = new Web3().providers
        injectProvider = new providers.WebsocketProvider('ws://localhost:7545')

        web3 = new Web3(injectProvider)

        accounts = await web3.eth.getAccounts()
        const contract = newContract(web3)

        return setContract({
          txContract,
          contract,
          userAddress: accounts.length ? accounts[0] : null,
          accounts,
          error: null
        })
      } catch (e) {
        return setPopup({
          showPop: true,
          messageKey: NO_PROVIDER.key
        })
      }
    })
  )

export default [initContractEpic]
