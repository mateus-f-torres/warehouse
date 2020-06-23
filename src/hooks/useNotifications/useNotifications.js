import React from 'react'

// import reducer, * as action from './reducer'
import reducer from './reducer'
import initialState from './handlers'

function useNotifications() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  /*
  function timedReset() {
    window.setTimeout(function () {
      dispatch(action.requestReset())
    }, 4000)
  }
  */

  return [state, dispatch]
}

/*
 * notification#start
 * notification#fail
 * notification#reset
 *
  dispatch(actions.requestStarted('Adicionando novo produto...'))
  dispatch(actions.requestStarted('Removendo produto...'))
  dispatch(actions.requestStarted('Modificando produto...'))
*/

export default useNotifications
