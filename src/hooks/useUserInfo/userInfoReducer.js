export const defaultUserInfo = {
  username: '',
  company: '',
}

const READ_USER_INFO = 'warehouse/user-info/READ_USER_INFO'
const WRITE_USER_INFO = 'warehouse/user-info/WRITE_USER_INFO'

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
  return {
    username: localStorage.getItem('username'),
    company: localStorage.getItem('company'),
  }
}

function writeUserInfoToLocalStorage([username, company]) {
  localStorage.setItem('username', username)
  localStorage.setItem('company', company)
  return {username, company}
}

export function readUserInfo() {
  return {type: READ_USER_INFO}
}

export function writeUserInfo(userInfo) {
  return {
    type: WRITE_USER_INFO,
    payload: userInfo,
  }
}
