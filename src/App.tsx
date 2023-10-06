import type { FunctionComponent } from 'react'
import './App.css'

import ExampleOne from 'views/ExampleOne'
import ExampleTwo from 'views/ExampleTwo'
import ExampleThree from 'views/ExampleThree'

const App: FunctionComponent = () => (
  <div className='App'>
    <ExampleThree />
  </div>
)

export default App
