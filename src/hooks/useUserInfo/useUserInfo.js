import React from 'react'
import {
  userInfoReducer,
  defaultUserInfo,
  readUserInfo,
  writeUserInfo,
} from './userInfoReducer'

function useUserInfo() {
  const [state, dispatch] = React.useReducer(userInfoReducer, defaultUserInfo)

  React.useLayoutEffect(() => {
    if (localStorage.getItem('username')) {
      dispatch(readUserInfo())
    }
  }, [])

  function setUserInfo(info) {
    dispatch(writeUserInfo(info))
  }

  return [state, setUserInfo]
}

export default useUserInfo
