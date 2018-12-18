import { Action } from '@Src/typing/globalTypes'
import { CREATE_CHALLENGE_GROUP, setCreateResult } from './action'
import { ofType, ActionsObservable, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'
import { ChallengeGroupType } from '@Src/typing/globalTypes'

export const newChallengeGroupEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(CREATE_CHALLENGE_GROUP),
    switchMap((action: Action) => {
      const contract = state$.value.get('common').get('contract')
      return from(
        contract.methods
          .createChallengeGroup(
            ...Object.values(action.payload as ChallengeGroupType)
          )
          .send()
      ).pipe(
        map(response =>
          setCreateResult({
            response
          })
        )
      )
    })
  )

export default [newChallengeGroupEpic]
