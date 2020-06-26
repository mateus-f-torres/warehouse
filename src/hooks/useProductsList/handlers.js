const initialState = {
  list: null,
  nextId: 0,
}

export function loadList(list) {
  list.sort((a, b) => (a.index > b.index ? 1 : -1))
  const nextId = getSpareIdInList(list)
  return {
    list,
    nextId,
  }
}

export function addItem(state, newItem) {
  const newList = [newItem, ...state.list]
  const nextId = getSpareIdInList(newList)
  return {
    nextId,
    list: newList,
  }
}

export function addArray(state, array) {
  const newList = [...array, ...state.list]
  const nextId = getSpareIdInList(newList)
  return {
    nextId,
    list: newList,
  }
}

export function deleteItem(state, id) {
  const filteredList = state.list.filter((item) => item.id !== id)
  const nextId = getSpareIdInList(filteredList)
  return {
    nextId,
    list: filteredList,
  }
}

export function updateItem(state, edit) {
  const editedList = state.list.map((item) =>
    item.id === edit.id ? edit : item,
  )
  return {
    list: editedList,
    nextId: state.nextId,
  }
}

export function clearList() {
  return {
    list: [],
    nextId: 1,
  }
}

function getSpareIdInList(arr) {
  return arr
    .map(({id}) => id)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((num, nextNumber) => (num == nextNumber ? num + 1 : num), 1)
}

export default initialState
