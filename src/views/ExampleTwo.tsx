import { useEffect } from 'react'
import { connect } from 'react-redux'
import type { FunctionComponent } from 'react'
import type { ConnectedProps } from 'react-redux'

import { init, updateChoice, fetchTimestamp } from 'actions/exampleTwo'
import type { RootState } from 'store'

const connector = connect(
  (
    { exampleTwo: { numberChoice, randomNumbers, timestamp } }: RootState
  ) => ({ numberChoice, randomNumbers, timestamp }),
  { init, updateChoice, fetchTimestamp }
)

const ExampleTwo: FunctionComponent<ConnectedProps<typeof connector>> = ({
  numberChoice,
  randomNumbers,
  timestamp,
  init,
  updateChoice,
  fetchTimestamp
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
      </div>
      <div>
        CURRENT UNIX TIME: {timestamp}
      </div>
      <div>
        <button
          onClick={() => fetchTimestamp()}
        >
          CLICK ME FOR A NEW TIMESTAMP
        </button>
      </div>
    </>
  )
}

export default connector(ExampleTwo)
