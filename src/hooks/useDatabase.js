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

function useDatabase(user) {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef({})

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

  return [
    state.list,
    {addProduct, removeProduct, updateProduct, clearAllProducts},
  ]
}

export default useDatabase
