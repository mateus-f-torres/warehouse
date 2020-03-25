import React from 'react'
import {
  defaultUserInfo,
  userInfoReducer,
  readUserInfo,
  writeUserInfo,
} from '../reducers/userInfoReducer'

function useUserInfo() {
  const [state, dispatch] = React.useReducer(userInfoReducer, defaultUserInfo)

  React.useLayoutEffect(() => {
    dispatch(readUserInfo())
  }, [])

  function createNewUser(info) {
    dispatch(writeUserInfo(info))
  }

  return [state, createNewUser]
}

export default useUserInfo
