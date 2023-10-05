import type { Reducer } from 'redux'

import { INIT, UPDATE_RANDOM_NUMBER } from 'actions/exampleOne'
import type { ExampleOneAction } from 'actions/exampleOne'

interface ExampleOneState {
  randomNumber?: number
  numberChoice?: number[]
}

const generateRandomNumber = (): number => Math.floor(Math.random() * 100)

const exampleOneReducer: Reducer<ExampleOneState, ExampleOneAction> = (state = {}, action) => {
  switch (action.type) {
    case INIT:
      return { ...state, numberChoice: [generateRandomNumber(), generateRandomNumber()] }

    case UPDATE_RANDOM_NUMBER:
      return {
        ...state,
        randomNumber: action.newNumber,
        numberChoice: [
          generateRandomNumber(),
          generateRandomNumber(),
          state.numberChoice !== undefined ? state.numberChoice : 0
        ]
      }

    default:
      return state
  }
}

export default exampleOneReducer
