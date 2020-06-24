import * as handle from './handlers'

const START = 'warehouse/notifications/START'
const DONE = 'warehouse/notifications/DONE'
const FAIL = 'warehouse/notifications/FAIL'
const RESET = 'warehouse/notifications/RESET'

function reducer(state, action) {
  switch (action.type) {
    case START:
      return handle.start(action.payload)

    case DONE:
      return handle.done(state)

    case FAIL:
      return handle.fail(state, action.payload)

    case RESET:
      return handle.reset()

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

export function done() {
  return {
    type: DONE,
  }
}

export function fail(motive) {
  return {
    type: FAIL,
    payload: motive,
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

export default reducer
