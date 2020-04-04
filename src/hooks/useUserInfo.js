import React from 'react'
import {
  defaultUserInfo,
  userInfoReducer,
  loadUser,
} from '../reducers/userInfoReducer'

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

function useUserInfo() {
  const [state, dispatch] = React.useReducer(userInfoReducer, defaultUserInfo)

  React.useLayoutEffect(() => {
    if (localStorage.getItem(USERNAME_KEY)) {
      const username = localStorage.getItem(USERNAME_KEY)
      const company = localStorage.getItem(COMPANY_KEY)
      dispatch(loadUser([username, company]))
    }
  }, [])

  function createNewUser([username, company]) {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(COMPANY_KEY, company)
    dispatch(loadUser([username, company]))
  }

  return {
    username: state.username,
    company: state.company,
    createNewUser,
  }
}

export default useUserInfo
