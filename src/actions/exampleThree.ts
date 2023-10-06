export const INIT = 'EXAMPLE_THREE_INIT'
export interface InitAction { type: typeof INIT }
export const init = (): InitAction => ({ type: INIT })

export const FETCH_TIMESTAMP = 'EXAMPLE_THREE_FETCH_TIMESTAMP'
export interface FetchTimestampAction {type: typeof FETCH_TIMESTAMP }
export const fetchTimestamp = (): FetchTimestampAction => ({ type: FETCH_TIMESTAMP })

export const STOP_TIMESTAMP = 'EXAMPLE_THREE_STOP_TIMESTAMP'
export interface StopTimestampAction { type: typeof STOP_TIMESTAMP }
export const stopTimestamp = (): StopTimestampAction => ({ type: STOP_TIMESTAMP })

export const UPDATE_CHOICE = 'EXAMPLE_THREE_UPDATE_CHOICE'
export interface UpdateChoiceAction { type: typeof UPDATE_CHOICE, newNumber: number }
export const updateChoice = (newNumber: number): UpdateChoiceAction => ({ type: UPDATE_CHOICE, newNumber })

export const UPDATE_TIMESTAMP = 'EXAMPLE_THREE_UPDATE_TIMESTAMP'
export interface UpdateTimestampAction { type: typeof UPDATE_TIMESTAMP, timestamp: number }
export const updateTimestamp = (timestamp: number): UpdateTimestampAction => ({ type: UPDATE_TIMESTAMP, timestamp })

export type ExampleThreeAction = InitAction
| FetchTimestampAction
| StopTimestampAction
| UpdateChoiceAction
| UpdateTimestampAction
