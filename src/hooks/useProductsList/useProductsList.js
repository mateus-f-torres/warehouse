import React from 'react'

import open from '../../utils/indexedDB/indexedDB'
import reducer, * as actions from './reducer'
import initialState from './handlers'

import useConfigAutosave from './utils/useConfigAutosave'
import createRandomProducts from './utils/createRandomProducts'

function useProductsList(user, draft) {
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
  const dispatchUpdateItem = (update) => dispatch(actions.updateItem(update))
  const dispatchClearList = () => dispatch(actions.clearList())

  function timedReset() {
    window.setTimeout(function () {
      dispatch(actions.requestReset())
    }, 4000)
  }

  React.useEffect(() => {
    open(DATABASE)
      .then((dbRef) => (database.current = dbRef))
      .then(loadList)
      .catch(console.error)
  }, [])

  function loadList() {
    database.current.getAll().then(dispatchLoadList)
  }

  function addItem(product) {
    dispatch(actions.requestStarted('Adicionando novo produto...'))

    const id = state.nextId
    const newProduct = {...product, id}

    database.current
      .add(newProduct)
      .then(dispatchAddItem)
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function deleteItem(id) {
    dispatch(actions.requestStarted('Removendo produto...'))

    database.current
      .delete(id)
      .then(dispatchDeleteItem)
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function updateItem(id, data) {
    dispatch(actions.requestStarted('Modificando produto...'))

    database.current
      .put(id, data)
      .then(dispatchUpdateItem)
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function clearList() {
    database.current.clearAll().then(dispatchClearList)
  }

  function addRandomItems(quantity) {
    const id = state.nextId
    const product = createRandomProducts(id, quantity)
    database.current.addRandom(product).then(dispatchAddArray)
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
