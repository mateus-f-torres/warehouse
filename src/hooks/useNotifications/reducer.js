import * as handle from './handlers'

const START = 'warehouse/notifications/START'
const RESET = 'warehouse/notifications/RESET'
const FAILED = 'warehouse/notifications/FAILED'

function reducer(state, action) {
  switch (action.type) {
    case START:
      return handle.start(state, action.payload)

    case FAILED:
      return handle.fail(state, action.payload)

    case RESET:
      return handle.reset(state)

    default:
      return state
  }
}

export function start(motive) {
  return {
    type: START,
    payload: motive,
  }
}

export function fail(motive) {
  return {
    type: FAILED,
    payload: motive,
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

export default reducer
