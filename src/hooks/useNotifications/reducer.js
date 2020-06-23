import * as handle from './handlers'

const REQUEST_RESET = 'warehouse/notifications/REQUEST_RESET'
const REQUEST_FAILED = 'warehouse/notifications/REQUEST_FAILED'
const REQUEST_STARTED = 'warehouse/notifications/REQUEST_STARTED'

function reducer(state, action) {
  switch (action.type) {
    case REQUEST_STARTED:
      return handle.requestStarted(state, action.payload)

    case REQUEST_FAILED:
      return handle.requestFailed(state, action.payload)

    case REQUEST_RESET:
      return handle.requestReset(state)

    default:
      return state
  }
}

export function requestStarted(motive) {
  return {
    type: REQUEST_STARTED,
    payload: motive,
  }
}

export function requestFailed(motive) {
  return {
    type: REQUEST_FAILED,
    payload: motive,
  }
}

export function requestReset() {
  return {
    type: REQUEST_RESET,
  }
}

export default reducer
