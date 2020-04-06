import React from 'react'

import listReducer, {
  loadList,
  addItem,
  deleteItem,
  updateItem,
  defaultList,
} from '../reducers/listReducer'
import createDatabase from '../utils/indexedDB/createDatabase'

function useDatabase(user) {
  const [state, dispatch] = React.useReducer(listReducer, defaultList)
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
      .then((result) => dispatch(loadList(result)))
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

  return [state.list, {addProduct, removeProduct, updateProduct}]
}

export default useDatabase
