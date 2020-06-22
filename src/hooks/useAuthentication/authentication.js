import {loadUserData, unloadUserData} from './authHandlers'

const LOAD_USER = 'warehouse/authentication/LOAD_USER'
const UNLOAD_USER = 'warehouse/authentication/UNLOAD_USER'

function authentication(state, action) {
  switch (action.type) {
    case LOAD_USER:
      return loadUserData(action.payload)

    case UNLOAD_USER:
      return unloadUserData()

    default:
      return state
  }
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

export default authentication
