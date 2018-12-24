import {
  GET_CAHLLENGE,
  SPONSER_CHALLENGE,
  setChallenge,
  setSponserResult
} from './action'
import { Action, ChallengeType } from '@Src/typing/globalTypes'

import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'

// import { Sponser } from '@Reducers/challengeReducer'

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
            startDayTimestamp: Number(response[3]) * 1000,
            sponserSize: Number(response[5])
          } as ChallengeType
          return setChallenge(challenge)
        })
      )
    })
    // catchError((err: any) => {
    //   return of({ type: 'test' })
    // })
  )

export const sponserChallengeEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(SPONSER_CHALLENGE),
    map(() => {
      return setSponserResult({})
    })
  )

export default [getChallengeEpic]
