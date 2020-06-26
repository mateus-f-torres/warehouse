import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'

import './sw/register'

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render(<App />, root)
}
