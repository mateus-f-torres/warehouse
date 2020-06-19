import React from 'react'

import userReducer, {
  loadUser,
  unloadUser,
  defaultUser,
} from '../../reducers/userReducer'

import * as storage from '../../utils/localStorage/localStorage'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useUser() {
  const [state, dispatch] = React.useReducer(userReducer, defaultUser)

  React.useLayoutEffect(() => {
    const data = storage.read([USERNAME_KEY, COMPANY_KEY])
    if (data.every((value) => value !== null)) {
      dispatch(loadUser(data))
    }
  }, [])

  function createUser([username, company]) {
    storage.write({[USERNAME_KEY]: username, [COMPANY_KEY]: company})
    dispatch(loadUser([username, company]))
  }

  function deleteUser() {
    storage.remove([USERNAME_KEY, COMPANY_KEY])
    dispatch(unloadUser())
  }

  return [
    {username: state.username, company: state.company},
    {createUser, deleteUser},
  ]
}

export default useUser
