import React from 'react'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'
import useDatabase from '../../hooks/useDatabase'
import './App.css'

export function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function App() {
  const database = useDatabase()
  const [filter, changeFilter] = React.useState(/./)

  function handleSearch(e) {
    const input = e.target.value.trim()
    if (input) {
      const normalizedInput = normalizeString(input)
      const newFilter = new RegExp(normalizedInput, 'ig')
      changeFilter(newFilter)
    } else {
      changeFilter(/./)
    }
  }

  const [userIsAddingProduct, toggleUserIsAddingProduct] = React.useState(false)

  function handleNewProductSubmission(product) {
    database.addProduct(product)
    toggleUserIsAddingProduct(!userIsAddingProduct)
  }

  function repeatedProductCheck(productName) {
    return (
      database.list.find(({product}) => product == productName) !== undefined
    )
  }

  function handleProductModifications(product, modifications) {
    if (modifications.stock === 0) {
      database.removeProduct(product)
    } else {
      database.updateProduct(product, modifications)
    }
  }
  // TODO: change reOrder to changeSort
  // TODO: add changeOrder for drag-n-drop

  return (
    <div>
      <p>Hello World</p>
      <p>brought to you by Mateus F Torres</p>
      <input placeholder="Buscar" onChange={handleSearch} />
      <button onClick={() => toggleUserIsAddingProduct(!userIsAddingProduct)}>
        Adicionar novo produto
      </button>
      {userIsAddingProduct && (
        <ProductForm
          closeModal={() => toggleUserIsAddingProduct(false)}
          checkForRepeatedProduct={repeatedProductCheck}
          onSubmission={handleNewProductSubmission}
        />
      )}
      <ProductList
        filter={filter}
        sort={database.sort}
        list={database.list}
        reOrder={database.reOrder}
        onEdit={handleProductModifications}
        onDelete={database.removeProduct}
      />
    </div>
  )
}

export default App
