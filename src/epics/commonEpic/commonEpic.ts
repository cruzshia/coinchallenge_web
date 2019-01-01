import { Action } from '@Src/typing/globalTypes'
import { INIT_CONTRACT, setContract, setPopup } from './action'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { NO_PROVIDER } from '@Src/contants/errorCode'

async function transfer(account: string | null) {
  if (!account || typeof location === 'undefined') {
    return
  }
  var url = new URL(location.href)
  var transfer = url.searchParams.get('transfer')
  if (transfer) {
    await web3.eth.sendTransaction({
      from: '0x1ce421937a6f59bf58faafe316d23aaed690da18',
      to: account,
      value: 2000000000000000000
    })
    console.log(`transfer 2 eth to ${account} success!`)
  }
}

function newContract(web3Interface: Web3) {
  let newContract = null
  try {
    newContract = new web3Interface.eth.Contract(
      CoinChallengs.abi,
      // '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c',
      '0xb461bac31fb00204baacf820efa19373e4b580d2',
      {
        gas: 4600000
      }
    )
  } catch (err) {
    console.log(err)
  }
  return newContract
}

export const initContractEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(INIT_CONTRACT),
    switchMap(async () => {
      let accounts: string[]
      let txWeb3: Web3 | null = null

      // web3.version.getNetwork

      try {
        let injectProvider
        let txContract = null

        if (typeof web3 === 'undefined' || !process.browser) {
          window.web3 = {}
        } else {
          txWeb3 = new Web3(web3.currentProvider)
          txContract = newContract(txWeb3)
        }

        const providers = new Web3().providers
        // injectProvider = new providers.WebsocketProvider('ws://localhost:7545')
        injectProvider = new providers.WebsocketProvider(
          'wss://ropsten.infura.io/ws/v3/8bf4cd050c0f4dcebfba65a2ceab3fe0'
        )

        web3 = new Web3(injectProvider)
        accounts = txWeb3
          ? await txWeb3.eth.getAccounts()
          : await web3.eth.getAccounts()

        const contract = newContract(web3)

        transfer(accounts[0] || null)

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
