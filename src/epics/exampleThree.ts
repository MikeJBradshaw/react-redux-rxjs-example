import { combineEpics, ofType } from 'redux-observable'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { timer } from 'rxjs'
import type { Observable } from 'rxjs'

import { FETCH_TIMESTAMP, STOP_TIMESTAMP, updateTimestamp } from 'actions/exampleThree'
import type { FetchTimestampAction, StopTimestampAction, UpdateTimestampAction } from 'actions/exampleThree'

const generateTimestampEpic = (
  action$: Observable<FetchTimestampAction | StopTimestampAction>
): Observable<UpdateTimestampAction> => action$.pipe(
  ofType(FETCH_TIMESTAMP), // filter out all actions except FETCH_TIMESTAMP
  switchMap(() => timer(0, 1000).pipe(
    takeUntil(action$.pipe(ofType(STOP_TIMESTAMP))), // stop the timer when STOP_TIMESTAMP is emitted
    map(() => updateTimestamp(Date.now()))
  ))
)

export default combineEpics(
  generateTimestampEpic as any
)
