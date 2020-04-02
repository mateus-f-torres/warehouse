import React from 'react'
import databaseReducer, {
  addNewItem,
  defaultDatabase,
  editItem,
  getAllItems,
  removeItem,
  sortItems,
} from '../reducers/databaseReducer'

function useDatabase() {
  const [state, dispatch] = React.useReducer(databaseReducer, defaultDatabase)
  const database = React.useRef(null)

  React.useEffect(() => {
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
    const request = database.current
      .transaction(['products'])
      .objectStore('products')
      .getAll()
    request.onerror = () => {
      console.log('could not getAll')
    }
    request.onsuccess = (e) => {
      dispatch(getAllItems(e.target.result))
    }
  }

  function addProduct(product) {
    // NOTE: handle errors elsewhere
    // transaction.oncomplete = () => { console.log('transaction completed') }
    // transaction.onerror = () => { console.log('transaction failed') }

    // isso é um BUG... ele não vai usar ID vagas
    const newId = state.ceilIndex + 1
    const total = Number((product.stock * product.price).toFixed(2))
    const newProduct = {...product, total, id: newId}

    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .add(newProduct)

    request.onsuccess = (event) => {
      dispatch(addNewItem(newProduct))
    }
    request.onerror = () => {
      console.log('product NOT added')
    }
  }

  function removeProduct(productName) {
    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .delete(productName)

    request.onsuccess = () => {
      dispatch(removeItem(productName))
    }

    request.onerror = () => {
      console.log('product NOT added')
    }
  }

  function updateProduct(productName, newProductData) {
    const store = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
    const request = store.get(productName)
    request.onerror = () => {
      console.log('product NOT modified')
    }

    request.onsuccess = (event) => {
      const oldData = event.target.result
      const newData = Object.assign({}, oldData, newProductData)
      const updateRequest = store.put(newData)

      updateRequest.onsuccess = () => {
        dispatch(editItem(newData))
      }

      updateRequest.onerror = () => {
        console.log('product NOT added')
      }
    }
  }

  function clearAllProducts() {
    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .clear()
    request.onerror = () => {
      console.log('database NOT cleared')
    }
    request.onsuccess = (e) => {
      console.log('database cleared', e.target.result)
    }
  }

  function changeSort(key) {
    dispatch(sortItems(key))
  }

  function changeOrder(list) {
    const oldData = state.productList
    const newData = oldData.map((p) => ({...p, order: list.indexOf(p.product)}))

    const store = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')

    for (const d of newData) {
      const updateRequest = store.put(d)
      updateRequest.onsuccess = () => {}
      updateRequest.onerror = () => {}
    }

    getAllProducts()
  }

  return {
    list: state.productList,
    addProduct,
    removeProduct,
    updateProduct,
    changeSort,
    changeOrder,
    clearAllProducts,
    getAllProducts,
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
