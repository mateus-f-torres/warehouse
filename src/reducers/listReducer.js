export const defaultList = {
  nextId: 0,
  list: [],
}

const LOAD_LIST = 'warehouse/database/LOAD_LIST'
const ADD_ITEM = 'warehouse/database/ADD_ITEM'
const DELETE_ITEM = 'warehouse/database/DELETE_ITEM'
const UPDATE_ITEM = 'warehouse/database/UPDATE_ITEM'

function listReducer(state, action) {
  switch (action.type) {
    case LOAD_LIST:
      return loadListWithItems(action.payload)

    case ADD_ITEM:
      return addItemToList(state, action.payload)

    case DELETE_ITEM:
      return deleteItemFromList(state, action.payload)

    case UPDATE_ITEM:
      return updateItemInList(state, action.payload)

    default:
      return state
  }
}

function loadListWithItems(items) {
  const nextId = getSpareIdInList(items)
  return {
    nextId,
    list: items,
  }
}

function addItemToList(state, newItem) {
  const newList = [newItem, ...state.list]
  const nextId = getSpareIdInList(newList)
  return {
    nextId,
    list: newList,
  }
}

function deleteItemFromList(state, id) {
  const filteredList = state.list.filter((item) => item.id !== id)
  const nextId = getSpareIdInList(filteredList)
  return {
    nextId,
    list: filteredList,
  }
}

function updateItemInList(state, edit) {
  const editedList = state.list.map((item) =>
    item.id === edit.id ? edit : item,
  )
  return {
    nextId: state.nextId,
    list: editedList,
  }
}

/*
// TODO: fix => esta com bugs
function sortItemsInDatabase(state, key) {
  if (state.sortKey !== key) {
    const newSort = [...state.productList].sort((a, b) => {
      if (a[key] < b[key]) return -1
      else if (a[key] > b[key]) return 1
      else return 0
    })

    return Object.assign({}, state, {
      productList: newSort,
      sortKey: key,
    })
  } else {
    // TODO: essa é a linha que quebra... esse reverse()
    return Object.assign({}, state, {
      productList: [...state.productList.reverse()],
    })
  }
}
*/

export function loadList(items) {
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

/*
export function sortItems(key) {
  return {
    type: SORT_ITEMS,
    payload: key,
  }
}
*/

function getSpareIdInList(arr) {
  return arr
    .map(({id}) => id)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((num, nextNumber) => (num == nextNumber ? num + 1 : num), 1)
}

export default listReducer
