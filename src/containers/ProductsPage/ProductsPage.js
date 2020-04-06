import React from 'react'

import {UserContext} from '../App/App'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'

import useDatabase from '../../hooks/useDatabase'
import './ProductsPage.css'

function ProductsPage() {
  const user = React.useContext(UserContext)
  const [list, {addProduct, removeProduct, updateProduct}] = useDatabase(user)
  // TODO: colocar dentro do Form
  const [userIsAddingProduct, toggleUserIsAddingProduct] = React.useState(false)

  function repeatedProductCheck(name) {
    return list.find(({product}) => product == name) !== undefined
  }

  // TODO: colocar dentro do Form
  function handleNewProductSubmission(product) {
    addProduct(product)
    toggleUserIsAddingProduct(false)
  }

  // TODO: melhorar ProductForm

  return (
    <div>
      <p>Olá {user.username}</p>
      <p>da empresa {user.company}</p>
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
        list={list}
        onEdit={updateProduct}
        onDelete={removeProduct}
      />
    </div>
  )
}

export default ProductsPage
