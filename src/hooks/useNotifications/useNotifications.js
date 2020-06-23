import React from 'react'

import reducer, * as action from './reducer'
import initialState from './handlers'

function useNotifications() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const dispatchStart = (code) => dispatch(action.start(code))
  const dispatchFail = (e) => dispatch(action.fail(e))
  const dispatchReset = () => dispatch(action.reset())

  return [
    state,
    {
      start: dispatchStart,
      fail: dispatchFail,
      reset: dispatchReset,
    },
  ]
}

/*
  function timedReset() {
    window.setTimeout(function () {
      dispatch(action.requestReset())
    }, 4000)
  }
*/

export default useNotifications
