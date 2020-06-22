import React from 'react'

import * as storage from '../../utils/localStorage/localStorage'
import authentication, * as actions from './authentication'
import {initialState} from './authHandlers'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useAuthentication() {
  const [state, dispatch] = React.useReducer(authentication, initialState)

  React.useLayoutEffect(() => {
    const data = storage.read([USERNAME_KEY, COMPANY_KEY])
    const isAuthenticated = data.every((key) => key !== null)

    if (isAuthenticated) {
      dispatch(actions.loadUser(data))
    }
  }, [])

  function createUser([username, company]) {
    storage.write({[USERNAME_KEY]: username, [COMPANY_KEY]: company})
    dispatch(actions.loadUser([username, company]))
  }

  function deleteUser() {
    storage.remove([USERNAME_KEY, COMPANY_KEY])
    dispatch(actions.unloadUser())
  }

  return [
    {username: state.username, company: state.company},
    {createUser, deleteUser},
  ]
}

export default useAuthentication
