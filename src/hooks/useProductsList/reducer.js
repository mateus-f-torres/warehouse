import * as handle from './handlers'

const LOAD_LIST = 'warehouse/products-list/LOAD_LIST'
const ADD_ITEM = 'warehouse/products-list/ADD_ITEM'
const ADD_ARRAY = 'warehouse/products-list/ADD_ARRAY'
const DELETE_ITEM = 'warehouse/products-list/DELETE_ITEM'
const UPDATE_ITEM = 'warehouse/products-list/UPDATE_ITEM'
const CLEAR_LIST = 'warehouse/products-list/CLEAR_LIST'
// move to another reducer
const REQUEST_RESET = 'warehouse/products-list/REQUEST_RESET'
const REQUEST_FAILED = 'warehouse/products-list/REQUEST_FAILED'
const REQUEST_STARTED = 'warehouse/products-list/REQUEST_STARTED'

function reducer(state, action) {
  switch (action.type) {
    case LOAD_LIST:
      return handle.loadList(action.payload)

    case ADD_ITEM:
      return handle.addItem(state, action.payload)

    case ADD_ARRAY:
      return handle.addArray(state, action.payload)

    case DELETE_ITEM:
      return handle.deleteItem(state, action.payload)

    case UPDATE_ITEM:
      return handle.updateItem(state, action.payload)

    case CLEAR_LIST:
      return handle.clearList()

    // NOTE: move to another reducer
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

export function loadList(list) {
  return {
    type: LOAD_LIST,
    payload: list,
  }
}

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: item,
  }
}

export function addArray(array) {
  return {
    type: ADD_ARRAY,
    payload: array,
  }
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: id,
  }
}

export function updateItem(edit) {
  return {
    type: UPDATE_ITEM,
    payload: edit,
  }
}

export function clearList() {
  return {
    type: CLEAR_LIST,
  }
}

// move to another reducer
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
