import { useEffect } from 'react'
import { connect } from 'react-redux'
import type { FunctionComponent } from 'react'
import type { ConnectedProps } from 'react-redux'

import { init, updateChoice, fetchTimestamp } from 'actions/exampleThree'
import type { RootState } from 'store'
import Timestamp from 'utils/Timestamp'

const connector = connect(
  (
    { exampleThree: { numberChoice, randomNumbers, timestamp } }: RootState
  ) => ({ numberChoice, randomNumbers, timestamp }),
  { init, updateChoice }
)

const ExampleTwo: FunctionComponent<ConnectedProps<typeof connector>> = ({
  numberChoice,
  randomNumbers,
  timestamp,
  init,
  updateChoice,
}) => {
  useEffect(() => {
    init()

    return () => { }
  }, [init])

  return (
    <>
      {numberChoice !== undefined && <div>YOU CHOSE: {numberChoice}</div>}
      {numberChoice === undefined && <div>Pick a number to see....</div>}
      <div>
        {randomNumbers !== undefined && <div>
          {randomNumbers.map(
            (num: number, index: number) => (
              <button onClick={() => updateChoice(num)} key={index}>{num}</button>
            ))}
        </div>}
        <Timestamp />
      </div>
    </>
  )
}

export default connector(ExampleTwo)
