import { useEffect } from 'react'
import { connect } from 'react-redux'
import type { FunctionComponent } from 'react'
import type { ConnectedProps } from 'react-redux'

import { init, updateChoice } from 'actions/exampleOne'
import type { RootState } from 'store'

const connector = connect(
  ({ exampleOne: { numberChoice, randomNumbers } }: RootState) => ({ numberChoice, randomNumbers }),
  { init, updateChoice }
)

const ExampleOne: FunctionComponent<ConnectedProps<typeof connector>> = ({
  numberChoice,
  randomNumbers,
  init,
  updateChoice
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
    </>
  )
}

export default connector(ExampleOne)
