import { FETCH_DATA, Action, fetchDone } from '../action/common'
import { ofType, ActionsObservable } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const fetchEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(FETCH_DATA),
    mergeMap((action: Action) => {
        const userId = action.payload && action.payload.userId
        console.log(userId)
        return ajax.getJSON(`https://api.coinbase.com/v2/exchange-rates`).pipe(
          map((response: any) => fetchDone(response.data))
        )
      }
    )
  )

export default [fetchEpic]