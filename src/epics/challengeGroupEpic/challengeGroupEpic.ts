import { Action } from '@Src/typing/globalTypes'
import { CREATE_CHALLENGE_GROUP, setCreateResult } from './action'
import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import {
  map,
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
          .createChallengeGroup(...Object.values(payload), address)
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
          // const challengeObject = {
          //   groupId: payload.id,
          //   targetDays: payload.minDays,
          //   totalDays: payload.maxDays,
          //   startTime: Math.floor(Date.now() / 1000)
          // }

          // contract.methods
          //   .createChallenge(...Object.values(challengeObject))
          //   .send({
          //     from: address,
          //     value: web3.utils.toWei('0.01', 'ether')
          //   })
          //   .on('error', function(error: any) {
          //     console.log(error)
          //   })
          //   .then((res: any) => {
          //     console.log(222222)
          //     console.log(res)
          //     console.log('create challenge success!')
          //   })

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
