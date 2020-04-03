import React from 'react'
import databaseReducer, {
  addNewItem,
  defaultDatabase,
  editItem,
  getAllItems,
  removeItem,
  sortItems,
} from '../reducers/databaseReducer'
import {
  addData,
  clearAllData,
  deleteData,
  getAllData,
  putData,
} from '../utils/indexedDB/indexedDB'

function getRandomDelay() {
  return Math.ceil(Math.random() * 10) * 1000
}

function useDatabase() {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef(null)

  React.useEffect(() => {
    // NOTE: handle errors elsewhere
    // transaction.oncomplete = () => { console.log('transaction completed') }
    // transaction.onerror = () => { console.log('transaction failed') }

    // NOTE: upgrade or delete previous DBs
    const request = indexedDB.open('DigitalWarehouse', 1)
    // handle errors
    request.onerror = handleError
    // handle new DB opening
    request.onupgradeneeded = handleUpgradeNeeded
    // onSuccess getAll and dispatch
    request.onsuccess = (event) => {
      database.current = event.target.result
      getAllProducts()
    }
  }, [])

  function getAllProducts() {
    // NOTE: start load  here?
    window.setTimeout(() => {
      getAllData('products', database.current)
        .then((result) => {
          dispatch(getAllItems(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function addProduct(product) {
    // isso é um BUG... ele não vai usar ID vagas
    const newId = state.ceilIndex + 1

    const total = Number((product.stock * product.price).toFixed(2))
    const newProduct = {...product, total, id: newId}

    window.setTimeout(() => {
      addData('products', database.current, newProduct)
        .then(() => {
          dispatch(addNewItem(newProduct))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function removeProduct(productName) {
    window.setTimeout(() => {
      deleteData('products', database.current, productName)
        .then(() => {
          dispatch(removeItem(productName))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  // BUG: se mudar nome perde a 'key'
  function updateProduct(productName, newProductData) {
    window.setTimeout(() => {
      putData('products', database.current, productName, newProductData)
        .then((result) => {
          dispatch(editItem(result))
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  function clearAllProducts() {
    window.setTimeout(() => {
      clearAllData('products', database.current)
        .then(() => {})
        .catch((error) => {
          throw new Error(error)
        })
    }, getRandomDelay())
  }

  function reOrder(key) {
    dispatch(sortItems(key))
  }

  return {
    list: state.productList,
    addProduct,
    removeProduct,
    updateProduct,
    reOrder,
    clearAllProducts,
  }
}

function handleError(event) {
  console.log("Why didn't you allow me to open the database ?")
}

function handleUpgradeNeeded(event) {
  const db = event.target.result

  const store = db.createObjectStore('products', {keyPath: 'product'})
  store.createIndex('product', 'product', {unique: true})
  store.transaction.oncomplete = function() {
    console.log('store upgraded')
  }
}

export default useDatabase
