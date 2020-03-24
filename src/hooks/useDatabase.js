import React from 'react'

function useDatabase() {
  const database = React.useRef(null)

  React.useEffect(() => {
    // NOTE: upgrade or delete previous DBs
    const request = indexedDB.open('DigitalWarehouse', 1)
    request.onerror = handleError
    request.onupgradeneeded = handleUpgradeNeeded
    request.onsuccess = (event) => handleSuccess(event, database)
  }, [])

  function addProduct(product) {
    // NOTE: handle errors elsewhere
    // transaction.oncomplete = () => { console.log('transaction completed') }
    // transaction.onerror = () => { console.log('transaction failed') }

    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .add(product)
    request.onsuccess = () => {
      console.log('product added')
    }
    request.onerror = () => {
      console.log('product NOT added')
    }
  }

  function removeProduct(product) {
    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .delete('Product Name')
    request.onsuccess = () => {
      console.log('product added')
    }
    request.onerror = () => {
      console.log('product NOT added')
    }
  }

  function updateProduct(product) {
    const store = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
    const request = store.get('Product Name')
    request.onerror = () => {
      console.log('product NOT added')
    }
    request.onsuccess = (event) => {
      // get old data
      const data = event.target.result
      // put altered data
      const updateRequest = store.put(data)
      updateRequest.onsuccess = () => {
        console.log('product added')
      }
      updateRequest.onerror = () => {
        console.log('product NOT added')
      }
    }
  }

  function getAllProducts() {
    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .getAll()
    request.onerror = () => {
      console.log('product NOT added')
    }
    request.onsuccess = (event) => {
      console.log(event.target.result)
    }
  }

  function clearAllProducts() {
    const request = database.current
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .clear()
    request.onerror = () => {
      console.log('product NOT added')
    }
    request.onsuccess = () => {
      console.log('product added')
    }
  }

  return {
    addProduct,
    removeProduct,
    updateProduct,
    getAllProducts,
    clearAllProducts,
  }
}

function handleError(event) {
  console.log("Why didn't you allow me to open the database ?")
}

function handleUpgradeNeeded(event) {
  const db = event.target.result

  const store = db.createObjectStore('products', {keyPath: 'name'})
  store.createIndex('name', 'name', {unique: true})
  store.transaction.oncomplete = function() {
    console.log('store upgraded')
  }
}

function handleSuccess(event, database) {
  database.current = event.target.result
  console.log('store opened')
}

export default useDatabase
