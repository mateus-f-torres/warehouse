import React from 'react'

import databaseReducer, {
  loadDatabase,
  addItem,
  deleteItem,
  updateItem,
  clearDatabase,
  notifyRequestStarted,
  notifyRequestFailed,
  defaultDatabase,
  requestReset,
} from '../../reducers/databaseReducer'

import open from '../../utils/indexedDB/indexedDB'

import useConfigAutosave from './utils/useConfigAutosave'

function useDatabase(user, draft) {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef()

  const DATABASE = {
    name: user.company,
    version: 1,
    store: 'products',
    key: 'id',
  }

  function timedReset() {
    window.setTimeout(function () {
      dispatch(requestReset())
    }, 4000)
  }

  React.useEffect(() => {
    open(DATABASE)
      .then((result) => (database.current = result))
      .then(() => getAllProducts())
      .catch((e) => console.error(new Error(e)))
  }, [])

  function getAllProducts() {
    dispatch(notifyRequestStarted(''))

    database.current
      .getAll()
      .then((result) => dispatch(loadDatabase(result)))
      .catch((e) => dispatch(notifyRequestFailed(e)))
  }

  function addProduct(product) {
    dispatch(notifyRequestStarted('Adicionando novo produto...'))

    const id = state.nextId
    const newProduct = {...product, id}

    database.current
      .add(newProduct)
      .then(() => dispatch(addItem(newProduct)))
      .catch((e) => dispatch(notifyRequestFailed(e)))
      .finally(timedReset)
  }

  function removeProduct(id) {
    dispatch(notifyRequestStarted('Removendo produto...'))

    database.current
      .delete(id)
      .then(() => dispatch(deleteItem(id)))
      .catch((e) => dispatch(notifyRequestFailed(e)))
      .finally(timedReset)
  }

  function updateProduct(id, data) {
    dispatch(notifyRequestStarted('Modificando produto...'))

    database.current
      .put(id, data)
      .then((result) => dispatch(updateItem(result)))
      .catch((e) => dispatch(notifyRequestFailed(e)))
      .finally(timedReset)
  }

  function clearAllProducts() {
    database.current.clearAll().then(() => dispatch(clearDatabase()))
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
      addProduct,
      removeProduct,
      updateProduct,
      clearAllProducts,
    },
  ]
}

export default useDatabase
