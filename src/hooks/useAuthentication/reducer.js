import * as handle from './handler'

const LOAD_USER = 'warehouse/authentication/LOAD_USER'
const UNLOAD_USER = 'warehouse/authentication/UNLOAD_USER'

function reducer(state, action) {
  switch (action.type) {
    case LOAD_USER:
      return handle.loadUser(action.payload)

    case UNLOAD_USER:
      return handle.unloadUser()

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

export default reducer
