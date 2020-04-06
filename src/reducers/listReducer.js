export const defaultList = {
  filter: /./,
  sort: 'id',
  visible: [],
  invisible: [],
  complete: [],
  columns: ['stock', 'price', 'total'],
}

const UPDATE_LIST = 'warehouse/list/UPDATE_LIST'
const CHANGE_FILTER = 'warehouse/list/CHANGE_FILTER'
const CHANGE_SORT = 'warehouse/list/CHANGE_SORT'
const CHANGE_COLUMN = 'warehouse/list/CHANGE_COLUMN'

function listReducer(state, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return updateCompleteList(state, action.payload)

    case CHANGE_FILTER:
      return filterList(state, action.payload)

    case CHANGE_SORT:
      return sortList(state, action.payload)

    case CHANGE_COLUMN:
      return changeColumnOrder(state, action.payload)

    default:
      return state
  }
}

function updateCompleteList(state, newCompleteList) {
  const newVisible = []
  const newInvisible = []

  for (const item of newCompleteList) {
    normalizeString(item.product).search(state.filter) >= 0
      ? newVisible.push(item)
      : newInvisible.push(item)
  }

  return {
    ...state,
    visible: newVisible,
    invisible: newInvisible,
    complete: newCompleteList,
  }
}

function filterList(state, filter) {
  if (filter) {
    const newVisible = []
    const newInvisible = []
    const newFilter = new RegExp(normalizeString(filter), 'ig')

    for (const item of state.complete) {
      normalizeString(item.product).search(newFilter) >= 0
        ? newVisible.push(item)
        : newInvisible.push(item)
    }

    return {
      ...state,
      filter: newFilter,
      visible: newVisible,
      invisible: newInvisible,
    }
  } else {
    return {
      ...state,
      filter: defaultList.filter,
      visible: state.complete,
      invisible: [],
    }
  }
}

function sortList(state, key) {
  const isSortInverted = state.sort.startsWith('!')
  const sortKey = isSortInverted ? state.sort.slice(1) : state.sort

  if (sortKey !== key) {
    const sortedList = [...state.visible].sort(fromLowestToHighest(key))
    return {...state, sort: key, visible: sortedList}
  } else if (isSortInverted === false) {
    const invertSort = '!' + key
    const sortedList = [...state.visible].sort(fromHighestToLowest(key))
    return {...state, sort: invertSort, visible: sortedList}
  } else {
    const sortedList = [...state.visible].sort(fromLowestToHighest(key))
    return {...state, sort: sortKey, visible: sortedList}
  }
}

function changeColumnOrder(state, [oldColumn, newColumn]) {
  const newColumns = state.columns.map((c) => (c == oldColumn ? newColumn : c))
  return {...state, columns: newColumns}
}

function fromLowestToHighest(key) {
  return function (a, b) {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function fromHighestToLowest(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1
    } else if (a[key] < b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function updateList(newList) {
  return {
    type: UPDATE_LIST,
    payload: newList,
  }
}

export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    payload: filter,
  }
}

export function changeSort(key) {
  return {
    type: CHANGE_SORT,
    payload: key,
  }
}

export function changeColumn(pair) {
  return {
    type: CHANGE_COLUMN,
    payload: pair,
  }
}

export default listReducer
