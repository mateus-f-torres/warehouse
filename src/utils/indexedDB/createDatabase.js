import composeDatabase from './composeDatabase'

function createDatabase({name, version, store, key}) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version)
    request.onerror = (e) => reject(e)

    request.onupgradeneeded = (e) => {
      const db = e.target.result

      const storeObj = db.createObjectStore(store, {keyPath: key})

      storeObj.transaction.oncomplete = () => {
        resolve(composeDatabase(db, store))
      }
    }

    request.onsuccess = (e) => {
      const db = e.target.result
      resolve(composeDatabase(db, store))
    }
  })
}

export default createDatabase
