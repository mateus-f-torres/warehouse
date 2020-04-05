export const defaultUser = {
  username: '',
  company: '',
}

const LOAD_USER = 'warehouse/userInfo-info/LOAD_USER'

export function userReducer(state, action) {
  switch (action.type) {
    case LOAD_USER:
      return loadUserFromLocalStorage(action.payload)
    default:
      return state
  }
}

function loadUserFromLocalStorage([username, company]) {
  return {username, company}
}

export function loadUser(user) {
  return {
    type: LOAD_USER,
    payload: user,
  }
}
