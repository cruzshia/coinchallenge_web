import {
  GET_CAHLLENGE,
  SPONSER_CHALLENGE,
  SponserProp,
  setChallenge
} from './action'
import { Action, ChallengeType } from '@Src/typing/globalTypes'

import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, mergeMap, switchMap, catchError, takeUntil } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { setPopup } from '../commonEpic/action'
import web3 from 'web3'

export const getChallengeEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(GET_CAHLLENGE),
    switchMap((action: Action) => {
      const commonReducer = state$.value.get('common')
      const [contract] = [commonReducer.get('contract')]
      const { groupId, challenger } = action.payload as any
      return from(
        contract.methods.getChallenge(groupId, challenger).call()
      ).pipe(
        map((response: any) => {
          const challenge = {
            targetDays: Number(response[0]),
            totalDays: Number(response[1]),
            completeDays: Number(response[2]),
            startDayTimestamp: Number(response[3]) * 1000 * 86400,
            sponserSize: Number(response[5]),
            amount: Number(web3.utils.fromWei(response._amount))
          } as ChallengeType
          return setChallenge(challenge)
        }),
        catchError((err: any) => {
          return of(setPopup({ showPop: true, popMessage: err }))
        })
      )
    })
  )

export const sponserChallengeEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(SPONSER_CHALLENGE),
    mergeMap((action: Action) => {
      const commonReducer = state$.value.get('common')
      const payload = action.payload as SponserProp
      const { groupId, who, comment, amount } = payload
      const [contract, address] = [
        commonReducer.get('txContract'),
        commonReducer.get('userAddress')
      ]

      return from(
        contract.methods.sponsorChallenge(groupId, who, comment).send({
          from: address,
          value: web3.utils.toWei(String(amount), 'ether')
        })
      ).pipe(
        map(() => setPopup({ showPop: true, messageKey: 'donateSuccess' })),
        catchError((err: Error) => {
          return of(setPopup({ showPop: true, popMessage: err.message }))
        })
      )
    })
  )

export default [getChallengeEpic, sponserChallengeEpic]
