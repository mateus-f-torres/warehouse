export const defaultDatabase = {
  ceilIndex: 1,
  productList: [],
  sortKey: 'name',
}

const GET_ALL_ITEMS = 'warehouse/database/GET_ALL_ITEMS'
const ADD_NEW_ITEM = 'warehouse/database/ADD_NEW_ITEM'
const REMOVE_ITEM = 'warehouse/database/REMOVE_ITEM'
const EDIT_ITEM = 'warehouse/database/EDIT_ITEM'
const SORT_ITEMS = 'warehouse/database/SORT_ITEMS'

function databaseReducer(state, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return getAllItemsFromDatabase(action.payload)

    case ADD_NEW_ITEM:
      return addNewItemToDatabase(state, action.payload)

    case REMOVE_ITEM:
      return removeItemFromDatabase(state, action.payload)

    case EDIT_ITEM:
      return editItemInDatabase(state, action.payload)

    case SORT_ITEMS:
      return sortItemsInDatabase(state, action.payload)

    default:
      return state
  }
}

function getAllItemsFromDatabase(items) {
  let ceilIndex = 1
  const productList = []

  items.forEach((item) => {
    if (item.id > ceilIndex) ceilIndex = item.id
    productList.push(item)
  })

  // BUG: falta o sort
  return {
    ceilIndex,
    productList,
  }
}

function addNewItemToDatabase(state, newItem) {
  return {
    ceilIndex: newItem.id,
    productList: [...state.productList, newItem],
  }
}

function removeItemFromDatabase(state, itemName) {
  return {
    ceilIndex: state.ceilIndex,
    productList: state.productList.filter((item) => item.product !== itemName),
  }
}

function editItemInDatabase(state, editedItem) {
  // TODO: chamar sort() apos editar item
  // preciso ter sort como uma key então... 'stock' e '!stock'
  return {
    ceilIndex: state.ceilIndex,
    productList: state.productList.map((item) =>
      item.product !== editedItem.product ? item : editedItem,
    ),
  }
}

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
    return Object.assign({}, state, {
      productList: [...state.productList.reverse()],
    })
  }
}

export function getAllItems(items) {
  return {
    type: GET_ALL_ITEMS,
    payload: items,
  }
}

export function addNewItem(item) {
  return {
    type: ADD_NEW_ITEM,
    payload: item,
  }
}

export function removeItem(itemName) {
  return {
    type: REMOVE_ITEM,
    payload: itemName,
  }
}

export function editItem(editedItem) {
  return {
    type: EDIT_ITEM,
    payload: editedItem,
  }
}

export function sortItems(key) {
  return {
    type: SORT_ITEMS,
    payload: key,
  }
}

export default databaseReducer
