export const defaultUser = {
  username: '',
  company: '',
}

const LOAD_USER = 'warehouse/user/LOAD_USER'
const UNLOAD_USER = 'warehouse/user/UNLOAD_USER'

function userReducer(state, action) {
  switch (action.type) {
    case LOAD_USER:
      return loadUserData(action.payload)

    case UNLOAD_USER:
      return unloadUserData()

    default:
      return state
  }
}

function loadUserData([username, company]) {
  return {username, company}
}

function unloadUserData() {
  return defaultUser
}

export function loadUser(user) {
  return {
    type: LOAD_USER,
    payload: user,
  }
}

export function unloadUser() {
  return {
    type: UNLOAD_USER,
  }
}

export default userReducer
