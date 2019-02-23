import { Action } from '@Src/typing/globalTypes'
import {
  INIT_CONTRACT,
  setContract,
  setPopup,
  GET_BALANCE,
  getBalance,
  setBalance,
  WITHDRAW_BALANCE
} from './action'
import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { switchMap, filter, mergeMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import Web3 from 'web3'
import { NO_PROVIDER } from '@Src/contants/errorCode'
import { newContract, detectNetwork } from '@Utils/contractUtils'

// async function transfer(account: string | null) {
//   if (
//     !account ||
//     typeof location === 'undefined' ||
//     location.href.indexOf('localhost') == -1
//   ) {
//     return
//   }
//   await web3.eth.sendTransaction({
//     from: '0x1ce421937a6f59bf58faafe316d23aaed690da18',
//     to: account,
//     value: 2000000000000000000
//   })
//   console.log(`transfer 2 eth to ${account} success!`)
// }

const checkContract = (state$: any) => {
  const commonReducer = state$.value.get('common')
  const [txContract, accounts] = [
    commonReducer.get('txContract'),
    commonReducer.get('accounts')
  ]
  return txContract !== null && accounts.length > 0
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
          await window.ethereum.enable()
        }

        const providers = new Web3().providers
        injectProvider = new providers.WebsocketProvider(network)

        web3 = new Web3(injectProvider)
        accounts = txWeb3
          ? await txWeb3.eth.getAccounts()
          : await web3.eth.getAccounts()

        const contract = newContract(web3)

        let accountBalance = '0'
        if (txContract) {
          accountBalance = await txContract.methods
            .userBalances(accounts[0])
            .call()
        }

        return setContract({
          txContract,
          contract,
          userAddress: accounts.length ? accounts[0] : null,
          accounts,
          accountBalance,
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

export const getBalanceEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(GET_BALANCE),
    filter(() => checkContract(state$)),
    switchMap(async () => {
      const commonReducer = state$.value.get('common')
      const [txContract, accounts] = [
        commonReducer.get('txContract'),
        commonReducer.get('accounts')
      ]

      try {
        let accountBalance = '0'
        if (txContract && accounts.length) {
          accountBalance = await txContract.methods
            .userBalances(accounts[0])
            .call()
        }

        return setBalance(accountBalance)
      } catch (err) {
        return setPopup({
          showPop: true,
          messageKey: '123'
        })
      }
    })
  )

export const withdrawEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(WITHDRAW_BALANCE),
    filter(() => checkContract(state$)),
    switchMap(() => {
      const commonReducer = state$.value.get('common')
      const [txContract, accounts] = [
        commonReducer.get('txContract'),
        commonReducer.get('accounts')
      ]

      return from(
        txContract.methods.userWithdraw().send({
          from: accounts[0]
        })
      ).pipe(
        mergeMap((response: any) => {
          return of(
            setPopup({
              showPop: true,
              popMessage: 'Tx hash : ' + response
            }),
            getBalance()
          )
        }),
        catchError((err: Error) => {
          return of(
            setPopup({
              showPop: true,
              messageKey: 'withdraw.error'
            })
          )
        })
      )
    })
  )

export default [initContractEpic, getBalanceEpic, withdrawEpic]
