export const initialState = {
  username: '',
  company: '',
}

export function loadUserData([username, company]) {
  return {username, company}
}

export function unloadUserData() {
  return {...initialState}
}
