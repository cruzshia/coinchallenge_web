import {
  GET_CAHLLENGE,
  SPONSER_CHALLENGE,
  SponserProp,
  setChallenge,
  setConfirmSponsor
} from './action'
import { Action, ChallengeType } from '@Src/typing/globalTypes'

import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, switchMap, catchError, take, repeat } from 'rxjs/operators'
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
            targetDays: Number(response._targetDays),
            totalDays: Number(response._totalDays),
            completeDays: Number(response._completeDays),
            startDayTimestamp:
              Number(response._startDayTimestamp) * 1000 * 86400,
            sponserSize: Number(response._sponsorSize),
            amount: Number(web3.utils.fromWei(response._amount))
          } as ChallengeType
          return challenge.totalDays
            ? setChallenge(challenge)
            : setPopup({ showPop: true, popMessage: 'challenge not found' })
        }),
        catchError((err: any) => {
          return of(setPopup({ showPop: true, popMessage: err }))
        })
      )
    })
  )

export const sponsorChallengeEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(SPONSER_CHALLENGE),
    take(1),
    switchMap((action: Action) => {
      const commonReducer = state$.value.get('common')
      const payload = action.payload as SponserProp
      const { groupId, who, comment, amount, dispatch } = payload
      const [contract, address] = [
        commonReducer.get('txContract'),
        commonReducer.get('userAddress')
      ]

      return from(
        contract.methods.sponsorChallenge(groupId, who, comment).send(
          {
            from: address,
            value: web3.utils.toWei(String(amount), 'ether')
          },
          (_err: any, hash: string) => {
            dispatch &&
              dispatch(
                setConfirmSponsor({
                  isCofirmingSponsor: true,
                  txhash: hash
                })
              )
          }
        )
      ).pipe(
        map(() => {
          return of(
            setPopup({ showPop: true, messageKey: 'donateSuccess' }),
            setConfirmSponsor({ isCofirmingSponsor: false, txhash: '' })
          )
        }),
        catchError((err: Error) => {
          return of(
            setPopup({ showPop: true, popMessage: err.message }),
            setConfirmSponsor({ isCofirmingSponsor: false, txhash: '' })
          )
        })
      )
    }),
    repeat()
  )

export default [getChallengeEpic, sponsorChallengeEpic]
