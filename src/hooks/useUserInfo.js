import React from 'react'
import {
  defaultUserInfo,
  userInfoReducer,
  loadUser,
} from '../reducers/userInfoReducer'
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from '../utils/localStorage/localStorage'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useUserInfo() {
  const [state, dispatch] = React.useReducer(userInfoReducer, defaultUserInfo)

  React.useLayoutEffect(() => {
    const info = readFromLocalStorage([USERNAME_KEY, COMPANY_KEY])
    if (info.every((i) => i !== null)) {
      dispatch(loadUser(info))
    }
  }, [])

  function createNewUser([username, company]) {
    writeToLocalStorage({[USERNAME_KEY]: username, [COMPANY_KEY]: company})
    dispatch(loadUser([username, company]))
  }

  return {
    username: state.username,
    company: state.company,
    createNewUser,
  }
}

export default useUserInfo
