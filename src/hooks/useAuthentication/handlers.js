const initialState = {
  username: '',
  company: '',
}

export function loadUser([username, company]) {
  return {username, company}
}

export function unloadUser() {
  return {...initialState}
}

export default initialState
