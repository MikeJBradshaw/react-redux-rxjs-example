import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import exampleOne from 'reducers/exampleOne'
import exampleTwo from 'reducers/exampleTwo'
import exampleThree from 'reducers/exampleThree'
import exampleTwoEpic from 'epics/exampleTwo'
import exampleThreeEpic from 'epics/exampleThree'

const reducers = combineReducers({
  exampleOne,
  exampleTwo,
  exampleThree
})
const epicMiddleware = createEpicMiddleware()

const store = createStore(reducers, applyMiddleware(epicMiddleware))
epicMiddleware.run(combineEpics(exampleTwoEpic, exampleThreeEpic))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
