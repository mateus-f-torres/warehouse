export const defaultDatabase = {
  list: null,
  nextId: 0,
}

const LOAD_LIST = 'warehouse/database/LOAD_LIST'
const ADD_ITEM = 'warehouse/database/ADD_ITEM'
const DELETE_ITEM = 'warehouse/database/DELETE_ITEM'
const UPDATE_ITEM = 'warehouse/database/UPDATE_ITEM'
const CLEAR_LIST = 'warehouse/database/CLEAR_LIST'

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
  }
}

function addItemToDatabase(state, newItem) {
  const newList = [...state.list, newItem]
  const nextId = getSpareIdInList(newList)
  return {
    nextId,
    list: newList,
  }
}

function deleteItemFromDatabase(state, id) {
  const filteredList = state.list.filter((item) => item.id !== id)
  const nextId = getSpareIdInList(filteredList)
  return {
    nextId,
    list: filteredList,
  }
}

function updateItemInDatabase(state, edit) {
  const editedList = state.list.map((item) =>
    item.id === edit.id ? edit : item,
  )
  return {
    nextId: state.nextId,
    list: editedList,
  }
}

function clearAllItemsInDatabase() {
  return {
    list: [],
    nextId: 0,
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

function getSpareIdInList(arr) {
  return arr
    .map(({id}) => id)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((num, nextNumber) => (num == nextNumber ? num + 1 : num), 1)
}

export default databaseReducer
