import React from 'react'

import open from '../../utils/indexedDB/indexedDB'
import reducer, * as actions from './reducer'
import {initialState} from './handlers'

import useConfigAutosave from './utils/useConfigAutosave'
import createRandomProducts from './utils/createRandomProducts'

function useProductsList(user, draft) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const database = React.useRef()

  const DATABASE = {
    name: user.company,
    version: 1,
    store: 'products',
    key: 'id',
  }

  function timedReset() {
    window.setTimeout(function () {
      dispatch(actions.requestReset())
    }, 4000)
  }

  React.useEffect(() => {
    open(DATABASE)
      .then((result) => (database.current = result))
      .then(() => getAllProducts())
      .catch(console.error)
  }, [])

  function getAllProducts() {
    dispatch(actions.requestStarted(''))

    database.current
      .getAll()
      .then((result) => dispatch(actions.loadList(result)))
      .catch((e) => dispatch(actions.requestFailed(e)))
  }

  function addProduct(product) {
    dispatch(actions.requestStarted('Adicionando novo produto...'))

    const id = state.nextId
    const newProduct = {...product, id}

    database.current
      .add(newProduct)
      .then(() => dispatch(actions.addItem(newProduct)))
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function removeProduct(id) {
    dispatch(actions.requestStarted('Removendo produto...'))

    database.current
      .delete(id)
      .then(() => dispatch(actions.deleteItem(id)))
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function updateProduct(id, data) {
    dispatch(actions.requestStarted('Modificando produto...'))

    database.current
      .put(id, data)
      .then((result) => dispatch(actions.updateItem(result)))
      .catch((e) => dispatch(actions.requestFailed(e)))
      .finally(timedReset)
  }

  function clearAllProducts() {
    database.current.clearAll().then(() => dispatch(actions.clearList()))
  }

  // BUG: disable if getAll failed, else hard crash
  function addSingleRandomProduct() {
    const id = state.nextId
    const [product] = createRandomProducts(id)

    database.current
      .addRandom(product)
      .then(() => dispatch(actions.addItem(product)))
  }

  // BUG: disable if getAll failed, else hard crash
  function addMultipleRandomProducts() {
    const id = state.nextId
    const products = createRandomProducts(id, 5)

    database.current
      .addRandom(products)
      .then(() => dispatch(actions.addArray(products)))
  }

  useConfigAutosave(saveCurrentOrder)

  function saveCurrentOrder() {
    if (database.current) {
      const newData = draft.current.map((item, index) => ({...item, index}))
      database.current.putAll(newData).then(console.log)
    }
  }

  return [
    {
      list: state.list,
      status: state.status,
    },
    {
      addProduct,
      removeProduct,
      updateProduct,
      clearAllProducts,
      addSingleRandomProduct,
      addMultipleRandomProducts,
    },
  ]
}

export default useProductsList
