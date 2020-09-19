import React from 'react'

import * as localStorage from '../../utils/localStorage/localStorage'
import reducer, * as actions from './reducer'
import initialState from './handler'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useAuthentication() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const dispatchLoadUser = (data) => dispatch(actions.loadUser(data))
  const dispatchUnloadUser = () => dispatch(actions.unloadUser())

  React.useLayoutEffect(authenticateUser, [])

  function authenticateUser() {
    const data = localStorage.read([USERNAME_KEY, COMPANY_KEY])
    const isAuthenticated = data.every((key) => key !== null)
    if (isAuthenticated) dispatchLoadUser(data)
  }

  function loadUser([username, company]) {
    localStorage.write({[USERNAME_KEY]: username, [COMPANY_KEY]: company})
    dispatchLoadUser([username, company])
  }

  function unloadUser() {
    localStorage.remove([USERNAME_KEY, COMPANY_KEY])
    dispatchUnloadUser()
  }

  return [
    {username: state.username, company: state.company},
    {loadUser, unloadUser},
  ]
}

export default useAuthentication
