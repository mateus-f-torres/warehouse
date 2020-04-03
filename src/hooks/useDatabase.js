import React from 'react'
import databaseReducer, {
  addNewItem,
  defaultDatabase,
  editItem,
  getAllItems,
  removeItem,
  sortItems,
} from '../reducers/databaseReducer'
import createDatabase from '../utils/indexedDB/createDatabase'

// TODO: tornar configuravel para rodar os tests E2E
function getRandomDelay() {
  return Math.ceil(Math.random() * 0) * 1000
}

// TODO: adicionar 09% de erro
// function throwRandomError() {
//   if (Math.random() > 0.9) throw new Error('Oh no!')
// }

// NOTE: export para limpar a mesma db no Cypress
const DATABASE = {
  name: 'DigitalWarehouse',
  version: 1,
  store: 'products',
  key: 'id',
}

function useDatabase() {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef({})

  React.useEffect(() => {
    createDatabase(DATABASE)
      .then((result) => {
        database.current = result
      })
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
          dispatch(getAllItems(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function addProduct(product) {
    const newId = state.ceilIndex
    const total = Number((product.stock * product.price).toFixed(2))
    const newProduct = {...product, total, id: newId}

    window.setTimeout(() => {
      database.current
        .addData(newProduct)
        .then(() => {
          dispatch(addNewItem(newProduct))
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
          dispatch(removeItem(id))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  // BUG: se mudar nome perde a 'key'
  function updateProduct(id, newData) {
    window.setTimeout(() => {
      database.current
        .putData(id, newData)
        .then((result) => {
          dispatch(editItem(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
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

  function reOrder(key) {
    dispatch(sortItems(key))
  }

  return {
    list: state.productList,
    addProduct,
    removeProduct,
    updateProduct,
    reOrder,
  }
}

export default useDatabase
