import { Action } from '@Src/typing/globalTypes'
import { INIT_CONTRACT, setContract, setPopup } from './action'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import Web3 from 'web3'
import { NO_PROVIDER } from '@Src/contants/errorCode'
import { newContract, detectNetwork } from '@Utils/contractUtils'

async function transfer(account: string | null) {
  if (
    !account ||
    typeof location === 'undefined' ||
    location.href.indexOf('localhost') == -1
  ) {
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

export const initContractEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(INIT_CONTRACT),
    switchMap(async () => {
      let accounts: string[]
      let txWeb3: Web3 | null = null

      try {
        let injectProvider
        let txContract = null
        let network = await detectNetwork(null)

        if (typeof web3 === 'undefined' || !process.browser) {
          window.web3 = {}
        } else {
          txWeb3 = new Web3(window.ethereum || web3.currentProvider)
          network = await detectNetwork(txWeb3)
          txContract = newContract(txWeb3)
        }

        const providers = new Web3().providers
        injectProvider = new providers.WebsocketProvider(network)

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
