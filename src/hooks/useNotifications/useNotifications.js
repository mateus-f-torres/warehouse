import React from 'react'

import reducer, * as action from './reducer'
import initialState from './handlers'

function useNotifications() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const dispatchStart = (code) => dispatch(action.start(code))
  const dispatchDone = () => dispatch(action.done())
  const dispatchFail = (e) => dispatch(action.fail(e))
  const dispatchReset = () => dispatch(action.reset())

  return [
    state,
    {
      start: dispatchStart,
      done: dispatchDone,
      fail: dispatchFail,
      reset: dispatchReset,
    },
  ]
}

export default useNotifications
