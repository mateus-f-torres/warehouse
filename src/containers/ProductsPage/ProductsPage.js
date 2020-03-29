import React from 'react'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'

export function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function ProductsPage(props) {
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
    props.addProduct(product)
    toggleUserIsAddingProduct(!userIsAddingProduct)
  }

  function repeatedProductCheck(productName) {
    return props.list.find(({product}) => product == productName) !== undefined
  }

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
        sort={props.sort}
        list={props.list}
        reOrder={props.reOrder}
        onEdit={props.updateProduct}
        onDelete={props.removeProduct}
      />
    </div>
  )
}

export default ProductsPage
