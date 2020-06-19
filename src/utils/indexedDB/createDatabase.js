import {openDB} from 'idb'

async function createDatabase({name, version, store, key}) {
  const db = await openDB(name, version, {
    upgrade(database) {
      return database.createObjectStore(store, {keyPath: key})
    },
  })

  return {
    add: makeAdd(db, store),
    put: makePut(db, store),
    delete: makeDelete(db, store),
    getAll: makeGetAll(db, store),
    putAll: makePutAll(db, store),
    clearAll: makeClearAll(db, store),
  }
}

function makeAdd(db, store) {
  return (data) => db.add(store, data)
}

function makePut(db, store) {
  return async (key, data) => {
    const tx = db.transaction(store, 'readwrite')

    const oldData = await tx.store.get(key)
    const newData = Object.assign({}, oldData, data)

    await tx.store.put(newData)

    return newData
  }
}

function makeDelete(db, store) {
  return (key) => db.delete(store, key)
}

function makeGetAll(db, store) {
  return () => db.getAll(store)
}

function makePutAll(db, store) {
  return (data) => {
    const tx = db.transaction(store, 'readwrite')

    for (const d of data) {
      tx.store.put(d)
    }

    return tx.done
  }
}

function makeClearAll(db, store) {
  return () => db.clear(store)
}

/*
function delayFor(time) {
  return new Promise(createTimeout(time))
}

function createTimeout(time) {
  return function (done) {
    window.setTimeout(done, time)
  }
}

function makeGetAll(db, store) {
  return () => {
    // await delayFor(5000)
    // fake.throwRandomError()
    return db.getAll(store)
  }
}
*/

export default createDatabase
