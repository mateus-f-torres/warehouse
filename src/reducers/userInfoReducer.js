export const defaultUserInfo = {
  username: '',
  company: '',
}

const USERNAME_KEY = 'username'
const COMPANY_KEY = 'company'

const READ_USER_INFO = 'warehouse/userInfo-info/READ_USER_INFO'
const WRITE_USER_INFO = 'warehouse/userInfo-info/WRITE_USER_INFO'

export function userInfoReducer(state, action) {
  switch (action.type) {
    case READ_USER_INFO:
      return readUserInfoFromLocalStorage()
    case WRITE_USER_INFO:
      return writeUserInfoToLocalStorage(action.payload)
    default:
      return state
  }
}

function readUserInfoFromLocalStorage() {
  if (localStorage.getItem(USERNAME_KEY)) {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      company: localStorage.getItem(COMPANY_KEY),
    }
  } else {
    return defaultUserInfo
  }
}

function writeUserInfoToLocalStorage([username, company]) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(COMPANY_KEY, company)
  return {username, company}
}

export function readUserInfo() {
  return {
    type: READ_USER_INFO,
  }
}

export function writeUserInfo(userInfo) {
  return {
    type: WRITE_USER_INFO,
    payload: userInfo,
  }
}
