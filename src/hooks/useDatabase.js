import React from 'react'

import databaseReducer, {
  loadDatabase,
  addItem,
  deleteItem,
  updateItem,
  clearDatabase,
  defaultDatabase,
} from '../reducers/databaseReducer'
import createDatabase from '../utils/indexedDB/createDatabase'

function useDatabase(user, draft) {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef()

  const DATABASE = {
    name: user.company,
    version: 1,
    store: 'products',
    key: 'id',
  }

  React.useEffect(() => {
    createDatabase(DATABASE)
      .then((result) => (database.current = result))
      .then(() => getAllProducts())
      .catch((e) => console.error(new Error(e)))
  }, [])

  function getAllProducts() {
    database.current
      .getAllData()
      .then((result) => dispatch(loadDatabase(result)))
      .catch((e) => console.error(new Error(e)))
  }

  function addProduct(product) {
    const newId = state.nextId
    const total = Number((product.stock * product.price).toFixed(2))
    const newProduct = {...product, total, id: newId}

    database.current
      .addData(newProduct)
      .then(() => dispatch(addItem(newProduct)))
      .catch((e) => console.error(new Error(e)))
  }

  function removeProduct(id) {
    database.current
      .deleteData(id)
      .then(() => dispatch(deleteItem(id)))
      .catch((e) => console.error(new Error(e)))
  }

  function updateProduct(id, newData) {
    database.current
      .putData(id, newData)
      .then((result) => dispatch(updateItem(result)))
      .catch((e) => console.error(new Error(e)))
  }

  function clearAllProducts() {
    database.current
      .clearAllData()
      .then(() => dispatch(clearDatabase()))
      .catch((e) => console.error(new Error(e)))
  }

  // NOTE: save before unmount (logout)
  React.useEffect(() => saveCurrentOrder, [])

  // NOTE: save before page close
  React.useEffect(() => {
    window.addEventListener('beforeunload', saveOnPageClose)
    document.addEventListener('visibilitychange', saveOnTabUnfocus)
    return () => {
      window.removeEventListener('beforeunload', saveOnPageClose)
      document.removeEventListener('visibilitychange', saveOnTabUnfocus)
    }
  }, [])

  function saveOnPageClose(e) {
    // TODO: raise prompt only once (save then allow close)
    // NOTE: if tab has focus will ask confirmation to close
    // e.preventDefault()
    // e.returnValue = ''
    saveCurrentOrder()
  }

  function saveOnTabUnfocus() {
    if (document.visibilityState == 'hidden') {
      saveCurrentOrder()
    }
  }

  function saveCurrentOrder(andClose) {
    const newData = draft.current.map((item, index) => ({...item, index}))
    database.current
      .updateAll(newData)
      .then(() => {})
      .catch((e) => console.error(new Error(e)))
  }

  return [
    state.list,
    {
      addProduct,
      removeProduct,
      updateProduct,
      clearAllProducts,
      saveCurrentOrder,
    },
  ]
}

export default useDatabase
