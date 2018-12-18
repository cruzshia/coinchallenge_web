import {
  GET_CAHLLENGE,
  GET_CAHLLENGE_SPONSERS,
  setChallenge,
  setChallengeSponsers
} from './action'
import { Action, ChallengeType } from '@Src/typing/globalTypes'

import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'

import { Sponser } from '@Reducers/challengeReducer'

export const getChallengeEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(GET_CAHLLENGE),
    switchMap((action: Action) => {
      const contract = state$.value.get('common').get('contract')
      const { groupId, challenger } = action.payload as any
      return from(
        contract.methods.getChallenge(groupId, challenger).call()
      ).pipe(
        map((response: any) => {
          const challenge = {
            targetDays: response[0].toNumber(),
            totalDays: response[1].toNumber(),
            completeDays: response[2].toNumber(),
            startDayTimestamp: response[3].toNumber(),
            sponserSize: response[5].toNumber()
          } as ChallengeType
          return setChallenge(challenge)
        })
      )
    })
  )

//GET_CAHLLENGE_SPONSERS
export const getChallengeSponserEpic = async (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(GET_CAHLLENGE_SPONSERS),
    map(async (action: Action) => {
      const contract = state$.value.get('common').get('contract')
      const sponserSize = state$.value.get('challenge').get('sponserSize') || 0
      const { groupId, challenger } = action.payload as any

      let sponsers: Array<Sponser> = []
      for (let i = 0; i < sponserSize; i++) {
        const sponser = await contract.methods
          .getSponsor(groupId, challenger, i)
          .call()
        sponsers.push(sponser)
      }
      return setChallengeSponsers({ sponsers })
    })
  )

export default [getChallengeEpic]
