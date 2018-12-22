import {
  GET_CAHLLENGE,
  GET_CAHLLENGE_SPONSERS,
  SPONSER_CHALLENGE,
  setChallenge,
  setChallengeSponsers,
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

// export const getChallengeSponserEpic = async (
// action$: ActionsObservable<Action>,
// state$: StateObservable<any>
// ) =>
//   action$.pipe(
//     ofType(GET_CAHLLENGE_SPONSERS),
//     map(async (action: Action) => {
//       const contract = state$.value.get('common').get('contract')
//       const sponserSize = state$.value.get('challenge').get('sponserSize') || 0
//       const { groupId, challenger } = action.payload as any

//       let sponsers: Array<Sponser> = []
//       for (let i = 0; i < sponserSize; i++) {
//         const sponser = await contract.methods
//           .getSponsor(groupId, challenger, i)
//           .call()
//         sponsers.push(sponser)
//       }
//       return setChallengeSponsers({ sponsers })
//     })
//   )

export default [getChallengeEpic]
