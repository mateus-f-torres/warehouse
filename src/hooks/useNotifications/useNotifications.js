import React from 'react'

import reducer, * as action from './reducer'
import initialState from './handler'

function useNotifications() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const dispatchStart = (code) => dispatch(action.start(code))
  const dispatchDone = () => dispatch(action.done())
  const dispatchFail = (e) => dispatch(action.fail(e))
  const dispatchReset = () => dispatch(action.reset())

  function reset() {
    if (notificationsCanResetSafely()) dispatchReset()
  }

  function notificationsCanResetSafely() {
    return state.verb == 'RESOLVED' || state.verb == 'REJECTED'
  }

  return [
    state,
    {
      reset,
      start: dispatchStart,
      done: dispatchDone,
      fail: dispatchFail,
    },
  ]
}

export default useNotifications
