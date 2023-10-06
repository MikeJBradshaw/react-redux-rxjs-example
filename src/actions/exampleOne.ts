
export const INIT = 'EXAMPLE_ONE_INIT'
export interface InitAction { type: typeof INIT }
export const init = (): InitAction => ({ type: INIT })

export const UPDATE_CHOICE = 'EXAMPLE_UPDATE_CHOICE'
export interface UpdateChoiceAction { type: typeof UPDATE_CHOICE, newNumber: number }
export const updateChoice = (newNumber: number): UpdateChoiceAction => ({ type: UPDATE_CHOICE, newNumber })

export type ExampleOneAction = InitAction
| UpdateChoiceAction
