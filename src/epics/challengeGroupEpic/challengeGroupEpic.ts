import { Action } from '@Src/typing/globalTypes'
import { CREATE_CHALLENGE_GROUP, setCreateResult } from './action'
import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import {
  switchMap,
  mergeMap,
  catchError,
  filter,
  take,
  repeat
} from 'rxjs/operators'
import { from, of } from 'rxjs'

import { setPopup, setConfirm } from '../commonEpic/action'

function parseErrorMsg(err: string) {
  if (err.indexOf('invalid addres') > -1) {
    return 'invalidAddress'
  } else if (err.indexOf('connection not open') > -1) {
    return 'connectNotOpen'
  } else if (err.indexOf('User denied') > -1) {
    return 'userDenied'
  }
  return 'createGroupError'
}

export const newChallengeGroupEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(CREATE_CHALLENGE_GROUP),
    take(1),
    filter(() => state$.value.get('common').get('txContract') !== null),
    switchMap((action: Action) => {
      const commonReducer = state$.value.get('common')
      const payload = { ...action.payload } as any
      const [contract, address] = [
        commonReducer.get('txContract'),
        commonReducer.get('userAddress')
      ]

      const dispatch = payload.dispatch
      delete payload.dispatch

      payload.minAmount = web3.utils.toWei(payload.minAmount, 'ether')
      return from(
        contract.methods
          .createChallengeGroup(
            ...Object.values(payload),
            '0xa99CeB4475670cCDF31a78232bfA585848598cBA'
          )
          .send({ from: address }, (_err: any, hash: string) => {
            dispatch(
              setConfirm({
                isConfirming: true,
                txHash: hash
              })
            )
          })
      ).pipe(
        mergeMap((response: any) => {
          return of(
            setCreateResult({
              response: {
                status: response.status,
                gasUsed: response.gasUsed
              },
              error: false
            }),
            setPopup({
              showPop: true,
              messageKey: 'createSuccess'
            })
          )
        }),
        catchError((err: Error) => {
          return of(
            setPopup({
              showPop: true,
              messageKey: parseErrorMsg(err.message)
            }),
            setCreateResult({
              response: {},
              error: true
            })
          )
        })
      )
    }),
    repeat()
  )

export default [newChallengeGroupEpic]
