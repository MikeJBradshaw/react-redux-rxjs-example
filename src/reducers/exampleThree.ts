import type { Reducer } from 'redux'

import { INIT, STOP_TIMESTAMP, UPDATE_CHOICE, UPDATE_TIMESTAMP } from 'actions/exampleThree'
import type { ExampleThreeAction } from 'actions/exampleThree'

interface ExampleThreeState {
  numberChoice?: number
  randomNumbers?: number[]
  timestamp: number
  isFetchingTimestamp: boolean
}

const initState: ExampleThreeState = {
  timestamp: Date.now(),
  isFetchingTimestamp: false
}

export const generateRandomNumbers = (): number => Math.floor(Math.random() * 100)

const exampleThreeReducer: Reducer<ExampleThreeState, ExampleThreeAction> = (state = initState, action) => {
  switch (action.type) {
    case INIT:
      return { ...state, randomNumbers: [generateRandomNumbers(), generateRandomNumbers()] }

    case STOP_TIMESTAMP:
      return { ...state, isFetchingTimestamp: false }

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
      return { ...state, timestamp: action.timestamp, isFetchingTimestamp: true }

    default:
      return state
  }
}

export default exampleThreeReducer
