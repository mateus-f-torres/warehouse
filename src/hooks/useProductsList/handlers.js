export const initialState = {
  list: null,
  nextId: 0,
  status: {
    verb: '',
    message: '',
  },
}

export function loadList(items) {
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

export function addItem(state, newItem) {
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

export function addArray(state, array) {
  const newList = [...array, ...state.list]
  const nextId = getSpareIdInList(newList)
  return {
    ...state,
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
    status: {
      verb: 'RESOLVED',
      message: 'Produto removido com sucesso!',
    },
  }
}

export function updateItem(state, edit) {
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

export function clearList() {
  return {
    list: [],
    nextId: 1,
    status: {
      verb: 'RESOLVED',
      message: '',
    },
  }
}

// move to another reducer
export function requestStarted(state, motive) {
  return {
    ...state,
    status: {
      message: motive,
      verb: 'REQUESTING',
    },
  }
}

export function requestFailed(state, error) {
  console.error(error)
  return {
    ...state,
    status: {
      verb: 'REJECTED',
      message: error.message,
    },
  }
}

export function requestReset(state) {
  return {
    ...state,
    status: {
      verb: 'IDLE',
      message: '',
    },
  }
}

function getSpareIdInList(arr) {
  return arr
    .map(({id}) => id)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((num, nextNumber) => (num == nextNumber ? num + 1 : num), 1)
}
