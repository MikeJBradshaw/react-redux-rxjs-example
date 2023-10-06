import { connect } from 'react-redux'
import type { FunctionComponent } from 'react'
import type { ConnectedProps } from 'react-redux'

import { fetchTimestamp, stopTimestamp } from 'actions/exampleThree'
import type { RootState } from 'store'

const connector = connect(
  ({ exampleThree: { timestamp, isFetchingTimestamp } }: RootState) => ({ timestamp, isFetchingTimestamp }),
  { fetchTimestamp, stopTimestamp }
)

const Timestamp: FunctionComponent<ConnectedProps<typeof connector>> = ({
  timestamp,
  isFetchingTimestamp,
  fetchTimestamp,
  stopTimestamp
}) => (
  <>
    <div>
      CURRENT UNIX TIME: {timestamp}
    </div>
    <div>
      <button 
        disabled={isFetchingTimestamp}
        onClick={() => fetchTimestamp()}
      >
        CLICK ME TO START TIMESTAMP
      </button>
      <button
        disabled={!isFetchingTimestamp}
        onClick={() => stopTimestamp()}
      >
        CLICK ME TO STOP TIMESTAMP
      </button>
    </div>
  </>
)

export default connector(Timestamp)
