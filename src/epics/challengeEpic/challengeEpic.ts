import {
  GET_CAHLLENGE,
  SPONSER_CHALLENGE,
  SponserProp,
  setChallengeGroup,
  setChallenge,
  setConfirmSponsor
} from './action'
import { Action } from '@Src/typing/globalTypes'

import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import {
  map,
  switchMap,
  catchError,
  filter,
  take,
  repeat,
  mergeMap
} from 'rxjs/operators'
import { from, of } from 'rxjs'
import { setPopup } from '../commonEpic/action'
import { parseChallenge } from '@Utils/contractUtils'
import web3 from 'web3'

export const getChallengeGroupEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(GET_CAHLLENGE),
    switchMap((action: Action) => {
      const commonReducer = state$.value.get('common')
      const [contract] = [commonReducer.get('contract')]
      const { groupId } = action.payload as any

      return from(contract.methods.getChallengeGroup(groupId).call()).pipe(
        map((response: any) => {
          return setChallengeGroup({
            groupName: response._name,
            groupImage: response._url,
            minAmount: Number(web3.utils.fromWei(response._minAmount))
          })
        }),
        catchError((err: any) => {
          return of(setPopup({ showPop: true, popMessage: err.message }))
        })
      )
    })
  )

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
          const challenge = parseChallenge(response)
          return challenge.totalDays
            ? setChallenge(challenge)
            : setPopup({ showPop: true, popMessage: 'challenge not found' })
        }),
        catchError((err: any) => {
          const { message } = err

          return of(
            setPopup({
              showPop: true,
              popMessage:
                message.indexOf('exist') !== -1
                  ? 'challenge not found'
                  : message
            })
          )
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
    filter(() => state$.value.get('common').get('txContract') !== null),
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
        mergeMap(() =>
          of(
            setPopup({ showPop: true, messageKey: 'donateSuccess' }),
            setConfirmSponsor({ isCofirmingSponsor: false, txhash: '' })
          )
        ),
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

export default [getChallengeGroupEpic, getChallengeEpic, sponsorChallengeEpic]
