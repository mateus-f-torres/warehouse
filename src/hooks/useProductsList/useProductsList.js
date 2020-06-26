import React from 'react'

import open from '../../utils/indexedDB/indexedDB'
import reducer, * as actions from './reducer'
import initialState from './handlers'

import useConfigAutosave from './utils/useConfigAutosave'
import createRandomProducts from './utils/createRandomProducts'

function useProductsList(user, draft, notify) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const database = React.useRef()

  const DATABASE = {
    name: user.company,
    version: 1,
    store: 'products',
    key: 'id',
  }

  // NOTE: use of React.useCallback ?
  const dispatchLoadList = (list) => dispatch(actions.loadList(list))
  const dispatchAddItem = (item) => dispatch(actions.addItem(item))
  const dispatchAddArray = (array) => dispatch(actions.addArray(array))
  const dispatchDeleteItem = (id) => dispatch(actions.deleteItem(id))
  const dispatchUpdateItem = (edit) => dispatch(actions.updateItem(edit))
  const dispatchClearList = () => dispatch(actions.clearList())

  React.useEffect(openDatabase, [])

  function openDatabase() {
    open(DATABASE)
      .then((ref) => (database.current = ref))
      .then(loadList)
      .catch(console.error)
  }

  function loadList() {
    database.current.getAll().then(dispatchLoadList)
  }

  function addItem(item) {
    notify.start('PRODUCT.ADD')

    const id = state.nextId
    const newItem = {...item, id}

    database.current
      .add(newItem)
      .then(dispatchAddItem)
      .then(notify.done, notify.fail)
  }

  function deleteItem(id) {
    notify.start('PRODUCT.DEL')

    database.current
      .delete(id)
      .then(dispatchDeleteItem)
      .then(notify.done, notify.fail)
  }

  function updateItem(id, data) {
    notify.start('PRODUCT.PUT')

    database.current
      .put(id, data)
      .then(dispatchUpdateItem)
      .then(notify.done, notify.fail)
  }

  function clearList() {
    database.current.clearAll().then(dispatchClearList)
  }

  function addRandomItems(quantity) {
    const id = state.nextId
    const items = createRandomProducts(id, quantity)
    database.current.addRandom(items).then(dispatchAddArray)
  }

  useConfigAutosave(saveCurrentOrder)

  function saveCurrentOrder() {
    if (database.current) {
      const newData = draft.current.map((item, index) => ({...item, index}))
      database.current.putAll(newData).then(console.log)
    }
  }

  return [
    {
      list: state.list,
      status: state.status,
    },
    {
      addItem,
      deleteItem,
      updateItem,
      clearList,
      addSingleRandomItem: addRandomItems.bind(null, 1),
      addMultipleRandomItems: addRandomItems.bind(null, 5),
    },
  ]
}

export default useProductsList
