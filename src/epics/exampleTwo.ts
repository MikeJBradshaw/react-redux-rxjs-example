import { combineEpics, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'

import { FETCH_TIMESTAMP, updateTimestamp } from 'actions/exampleTwo'
import type { FetchTimestampAction, UpdateTimestampAction } from 'actions/exampleTwo'

const generateTimestampEpic = (
  action$: Observable<FetchTimestampAction>
): Observable<UpdateTimestampAction> => action$.pipe(
  ofType(FETCH_TIMESTAMP), // filter out all actions except FETCH_TIMESTAMP
  map(() => updateTimestamp(Date.now()))
)

export default combineEpics(
  generateTimestampEpic as any
)
