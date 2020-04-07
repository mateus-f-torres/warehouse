// TODO: tornar configuravel para rodar os tests E2E
function getRandomDelay() {
  return Math.ceil(Math.random() * 0) * 1000
}

// TODO: adicionar chance de ERROR
// function throwRandomError() {
//   if (Math.random() > 0.9) throw new Error('Oh no!')
// }

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
  return function () {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const request = db.transaction(store).objectStore(store).getAll()
        request.onerror = (e) => {
          reject(e)
        }
        request.onsuccess = (e) => {
          resolve(e.target.result)
        }
      }, getRandomDelay())
    })
  }
}

function composeAddData(db, store) {
  return function (data) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
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
      }, getRandomDelay())
    })
  }
}

function composeDeleteData(db, store) {
  return function (key) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
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
      }, getRandomDelay())
    })
  }
}

function composePutData(db, store) {
  return function (key, data) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
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
      }, getRandomDelay())
    })
  }
}

function composeClearAllData(db, store) {
  return function () {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
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
      }, getRandomDelay())
    })
  }
}

export default composeDatabase
