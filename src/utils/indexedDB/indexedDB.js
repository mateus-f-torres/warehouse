export function getAllData(store, db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readonly')
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

export function addData(store, db, data) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readwrite')
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

export function deleteData(store, db, key) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readwrite')
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

export function putData(store, db, key, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([store], 'readwrite')
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

export function clearAllData(store, db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readwrite')
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
