import fake from '../fake/fake'

/* NOTE:
    IndexedDB methods are most of the time almost immediate
    That depends on the number of actions and the event loop
    Theses IndexedDB calls are wrapped inside Promises for easy of use

    fake.asyncDelay and fake.throwRandomError are just practice functions
    When using a real external API there is always the possibility of delays and errors
    Removing theses calls wont affect the main application
 */

function composeDatabase(db, store) {
  return {
    getAllData: composeGetAllData(db, store),
    addData: composeAddData(db, store),
    deleteData: composeDeleteData(db, store),
    putData: composePutData(db, store),
    updateAll: composeUpdateAll(db, store),
    clearAllData: composeClearAllData(db, store),
  }
}

function composeGetAllData(db, store) {
  return function () {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          fake.throwRandomError()
        } catch (e) {
          return reject(e)
        }

        const request = db.transaction(store).objectStore(store).getAll()

        request.onerror = (e) => {
          reject(e)
        }
        request.onsuccess = (e) => {
          resolve(e.target.result)
        }
      }, fake.asyncDelay())
    })
  }
}

function composeAddData(db, store) {
  return function (data) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          fake.throwRandomError()
        } catch (e) {
          return reject(e)
        }

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
      }, fake.asyncDelay())
    })
  }
}

function composeDeleteData(db, store) {
  return function (key) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          fake.throwRandomError()
        } catch (e) {
          return reject(e)
        }

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
      }, fake.asyncDelay())
    })
  }
}

function composePutData(db, store) {
  return function (key, data) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          fake.throwRandomError()
        } catch (e) {
          return reject(e)
        }

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
      }, fake.asyncDelay())
    })
  }
}

function composeUpdateAll(db, store) {
  return function (updatedData) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite')
      const storeRef = transaction.objectStore(store)
      for (const d of updatedData) {
        storeRef.put(d)
      }
      transaction.onerror = (e) => {
        reject(e)
      }
      transaction.oncomplete = () => {
        resolve()
      }
    })
  }
}

function composeClearAllData(db, store) {
  return function () {
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
