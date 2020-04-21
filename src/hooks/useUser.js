import React from 'react'

import userReducer, {
  loadUser,
  unloadUser,
  defaultUser,
} from '../reducers/userReducer'

import {
  readFromLocalStorage,
  writeToLocalStorage,
  removeFromLocalStorage,
} from '../utils/localStorage/localStorage'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useUser() {
  const [state, dispatch] = React.useReducer(userReducer, defaultUser)

  React.useLayoutEffect(() => {
    const data = readFromLocalStorage([USERNAME_KEY, COMPANY_KEY])
    if (data.every((value) => value !== null)) {
      dispatch(loadUser(data))
    }
  }, [])

  function createUser([username, company]) {
    writeToLocalStorage({[USERNAME_KEY]: username, [COMPANY_KEY]: company})
    dispatch(loadUser([username, company]))
  }

  function deleteUser() {
    removeFromLocalStorage([USERNAME_KEY, COMPANY_KEY])
    dispatch(unloadUser())
  }

  return [
    {username: state.username, company: state.company},
    {createUser, deleteUser},
  ]
}

export default useUser
