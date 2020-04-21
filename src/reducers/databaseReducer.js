export const defaultDatabase = {
  list: null,
  nextId: 0,
  status: {
    verb: '',
    message: '',
  },
}

const LOAD_LIST = 'warehouse/database/LOAD_LIST'
const ADD_ITEM = 'warehouse/database/ADD_ITEM'
const DELETE_ITEM = 'warehouse/database/DELETE_ITEM'
const UPDATE_ITEM = 'warehouse/database/UPDATE_ITEM'
const CLEAR_LIST = 'warehouse/database/CLEAR_LIST'

const REQUEST_RESET = 'warehouse/database/REQUEST_RESET'
const REQUEST_FAILED = 'warehouse/database/REQUEST_FAILED'
const REQUEST_STARTED = 'warehouse/database/REQUEST_STARTED'

function databaseReducer(state, action) {
  switch (action.type) {
    case LOAD_LIST:
      return loadDatabaseWithItems(action.payload)

    case ADD_ITEM:
      return addItemToDatabase(state, action.payload)

    case DELETE_ITEM:
      return deleteItemFromDatabase(state, action.payload)

    case UPDATE_ITEM:
      return updateItemInDatabase(state, action.payload)

    case CLEAR_LIST:
      return clearAllItemsInDatabase()

    case REQUEST_STARTED:
      return notifyUserRequestHasStarted(state, action.payload)

    case REQUEST_FAILED:
      return notifyUserRequestHasFailed(state, action.payload)

    case REQUEST_RESET:
      return resetRequestNotification(state)

    default:
      return state
  }
}

function loadDatabaseWithItems(items) {
  items.sort((a, b) => (a.index > b.index ? 1 : -1))
  const nextId = getSpareIdInList(items)
  return {
    nextId,
    list: items,
    status: {
      verb: 'RESOLVED',
      message: '',
    },
  }
}

function addItemToDatabase(state, newItem) {
  const newList = [newItem, ...state.list]
  const nextId = getSpareIdInList(newList)
  return {
    nextId,
    list: newList,
    status: {
      verb: 'RESOLVED',
      message: 'Produto adicionado com sucesso!',
    },
  }
}

function deleteItemFromDatabase(state, id) {
  const filteredList = state.list.filter((item) => item.id !== id)
  const nextId = getSpareIdInList(filteredList)
  return {
    nextId,
    list: filteredList,
    status: {
      verb: 'RESOLVED',
      message: 'Produto removido com sucesso!',
    },
  }
}

function updateItemInDatabase(state, edit) {
  const editedList = state.list.map((item) =>
    item.id === edit.id ? edit : item,
  )
  return {
    list: editedList,
    nextId: state.nextId,
    status: {
      verb: 'RESOLVED',
      message: 'Produto modificado com sucesso!',
    },
  }
}

function clearAllItemsInDatabase() {
  return {
    list: [],
    nextId: 0,
    status: {
      verb: 'RESOLVED',
      message: '',
    },
  }
}

function notifyUserRequestHasStarted(state, motive) {
  return {
    ...state,
    status: {
      message: motive,
      verb: 'REQUESTING',
    },
  }
}

function notifyUserRequestHasFailed(state, error) {
  console.error(error)
  return {
    ...state,
    status: {
      verb: 'REJECTED',
      message: error.message,
    },
  }
}

function resetRequestNotification(state) {
  return {
    ...state,
    status: {
      verb: 'IDLE',
      message: '',
    },
  }
}

export function loadDatabase(items) {
  return {
    type: LOAD_LIST,
    payload: items,
  }
}

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: item,
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

export function clearDatabase() {
  return {
    type: CLEAR_LIST,
  }
}

export function notifyRequestStarted(motive) {
  return {
    type: REQUEST_STARTED,
    payload: motive,
  }
}

export function notifyRequestFailed(motive) {
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

function getSpareIdInList(arr) {
  return arr
    .map(({id}) => id)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((num, nextNumber) => (num == nextNumber ? num + 1 : num), 1)
}

export default databaseReducer
