import {openDB} from 'idb'
import fakeAPI from '../fakeAPI/fakeAPI'

async function createDatabase({name, version, store, key}) {
  const db = await openDB(name, version, {
    upgrade(database) {
      return database.createObjectStore(store, {keyPath: key})
    },
  })

  return {
    add: fakeAPI(makeAdd(db, store)),
    put: fakeAPI(makePut(db, store)),
    delete: fakeAPI(makeDelete(db, store)),
    getAll: makeGetAll(db, store),
    putAll: makePutAll(db, store),
    clearAll: makeClearAll(db, store),
    addRandom: makeAddRandom(db, store),
  }
}

function makeAdd(db, store) {
  return (data) => db.add(store, data).then(() => data)
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
  return (key) => db.delete(store, key).then(() => key)
}

function makeGetAll(db, store) {
  return () => db.getAll(store)
}

function makePutAll(db, store) {
  return (data) => {
    const tx = db.transaction(store, 'readwrite')

    for (const d of data) tx.store.put(d)

    return tx.done
  }
}

function makeClearAll(db, store) {
  return () => db.clear(store)
}

function makeAddRandom(db, store) {
  return (data) => {
    const tx = db.transaction(store, 'readwrite')

    for (const d of data) tx.store.add(d)

    return tx.done.then(() => data)
  }
}

export default createDatabase
