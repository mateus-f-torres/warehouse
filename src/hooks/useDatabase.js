import React from 'react'
import listReducer, {
  loadList,
  addItem,
  deleteItem,
  updateItem,
  defaultList,
} from '../reducers/listReducer'
import createDatabase from '../utils/indexedDB/createDatabase'

// TODO: tornar configuravel para rodar os tests E2E
function getRandomDelay() {
  return Math.ceil(Math.random() * 0) * 1000
}

// NOTE: export para limpar a mesma db no Cypress
const DATABASE = {
  name: 'DigitalWarehouse',
  version: 1,
  store: 'products',
  key: 'id',
}

function useDatabase() {
  const [state, dispatch] = React.useReducer(listReducer, defaultList)
  const database = React.useRef({})

  React.useEffect(() => {
    createDatabase(DATABASE)
      .then((result) => {
        database.current = result
      })
      // NOTE: localStorage.getItem('username') ? getAll : clearAll
      .then(() => getAllProducts())
      .catch((e) => {
        throw new Error(e)
      })
  }, [])

  function getAllProducts() {
    window.setTimeout(() => {
      database.current
        .getAllData()
        .then((result) => {
          dispatch(loadList(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function addProduct(product) {
    const newId = state.nextId
    const total = Number((product.stock * product.price).toFixed(2))
    const newProduct = {...product, total, id: newId}

    window.setTimeout(() => {
      database.current
        .addData(newProduct)
        .then(() => {
          dispatch(addItem(newProduct))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function removeProduct(id) {
    window.setTimeout(() => {
      database.current
        .deleteData(id)
        .then(() => {
          dispatch(deleteItem(id))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function updateProduct(id, newData) {
    window.setTimeout(() => {
      database.current
        .putData(id, newData)
        .then((result) => {
          dispatch(updateItem(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  /**
  function clearAllProducts() {
    window.setTimeout(() => {
      database.current.clearAllData()
        .then(() => {})
        .catch((error) => { throw new Error(error) })
    }, getRandomDelay())
  }
  **/

  return [state.list, {addProduct, removeProduct, updateProduct}]
}

export default useDatabase
