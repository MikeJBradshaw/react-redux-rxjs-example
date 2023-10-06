import type { Reducer } from 'redux'

import { INIT, UPDATE_CHOICE, UPDATE_TIMESTAMP } from 'actions/exampleTwo'
import type { ExampleTwoAction } from 'actions/exampleTwo'

interface ExampleTwoState {
  numberChoice?: number
  randomNumbers?: number[]
  timestamp: number
}

const initState: ExampleTwoState = {
  timestamp: Date.now()
}

const generateRandomNumbers = (): number => Math.floor(Math.random() * 100)

const exampleTwoReducer: Reducer<ExampleTwoState, ExampleTwoAction> = (state = initState, action) => {
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

    case UPDATE_TIMESTAMP:
      return { ...state, timestamp: action.timestamp }

    default:
      return state
  }
}

export default exampleTwoReducer
