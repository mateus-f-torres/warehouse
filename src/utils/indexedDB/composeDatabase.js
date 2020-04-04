function composeDatabase(db, store) {
  return {
    getAllData: composeGetAllData(db, store),
    addData: composeAddData(db, store),
    deleteData: composeDeleteData(db, store),
    putData: composePutData(db, store),
    clearAllData: composeClearAllData(db, store),
  }
}

function composeGetAllData(db, store) {
  return function() {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(store)
        .objectStore(store)
        .getAll()
      request.onerror = (e) => {
        reject(e)
      }
      request.onsuccess = (e) => {
        resolve(e.target.result)
      }
    })
  }
}

function composeAddData(db, store) {
  return function(data) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .add(data)
      request.onerror = (e) => {
        reject(e)
      }
      request.onsuccess = () => {
        resolve()
      }
    })
  }
}

function composeDeleteData(db, store) {
  return function(key) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .delete(key)
      request.onerror = (e) => {
        reject(e)
      }
      request.onsuccess = () => {
        resolve()
      }
    })
  }
}

function composePutData(db, store) {
  return function(key, data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite')
      const storeRef = transaction.objectStore(store)
      const getRequest = storeRef.get(key)

      transaction.onerror = (e) => {
        reject(e)
      }

      getRequest.onsuccess = (e) => {
        const oldData = e.target.result
        const newData = Object.assign({}, oldData, data)
        const updateRequest = storeRef.put(newData)

        updateRequest.onsuccess = () => {
          resolve(newData)
        }
      }
    })
  }
}

function composeClearAllData(db, store) {
  return function() {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .clear()
      request.onerror = (e) => {
        reject(e)
      }
      request.onsuccess = () => {
        resolve()
      }
    })
  }
}

export default composeDatabase
