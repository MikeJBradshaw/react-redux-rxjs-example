
export const INIT = 'EXAMPLE_ONE_INIT'
export interface InitAction { type: typeof INIT }
export const init = (): InitAction => ({ type: INIT })

export const UPDATE_RANDOM_NUMBER = 'EXAMPLE_UPDATE_RANDOM_NUMBER'
export interface UpdateRandomNumberAction { type: typeof UPDATE_RANDOM_NUMBER, newNumber: number }
export const updateRandomNumber = (newNumber: number): UpdateRandomNumberAction => ({ type: UPDATE_RANDOM_NUMBER, newNumber })

export type ExampleOneAction = InitAction
| UpdateRandomNumberAction
