import React from 'react'

import {UserContext} from '../App/App'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'

import './ProductsPage.css'

function ProductsPage(props) {
  const user = React.useContext(UserContext)
  const [userIsAddingProduct, toggleUserIsAddingProduct] = React.useState(false)

  function repeatedProductCheck(name) {
    return props.list.find(({product}) => product == name) !== undefined
  }

  function handleNewProductSubmission(product) {
    props.addProduct(product)
    toggleUserIsAddingProduct(false)
  }

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
        list={props.list}
        onEdit={props.updateProduct}
        onDelete={props.removeProduct}
      />
    </div>
  )
}

export default ProductsPage
