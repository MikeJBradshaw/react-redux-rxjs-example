import type { Reducer } from 'redux'

import { INIT, UPDATE_CHOICE } from 'actions/exampleOne'
import type { ExampleOneAction } from 'actions/exampleOne'

interface ExampleOneState {
  numberChoice?: number
  randomNumbers?: number[]
}

const generateRandomNumbers = (): number => Math.floor(Math.random() * 100)

const exampleOneReducer: Reducer<ExampleOneState, ExampleOneAction> = (state = {}, action) => {
  switch (action.type) {
    case INIT:
      return { ...state, randomNumbers: [generateRandomNumbers(), generateRandomNumbers()] }

    case UPDATE_CHOICE:
      return {
        ...state,
        numberChoice: action.newNumber,
        randomNumbers: [
          generateRandomNumbers(),
          generateRandomNumbers(),
          state.numberChoice !== undefined ? state.numberChoice : 0
        ]
      }

    default:
      return state
  }
}

export default exampleOneReducer
