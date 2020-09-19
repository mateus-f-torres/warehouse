import * as handle from './handler'

const LOAD_LIST = 'warehouse/products-list/LOAD_LIST'
const ADD_ITEM = 'warehouse/products-list/ADD_ITEM'
const ADD_ARRAY = 'warehouse/products-list/ADD_ARRAY'
const DELETE_ITEM = 'warehouse/products-list/DELETE_ITEM'
const UPDATE_ITEM = 'warehouse/products-list/UPDATE_ITEM'
const CLEAR_LIST = 'warehouse/products-list/CLEAR_LIST'

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

export default reducer
