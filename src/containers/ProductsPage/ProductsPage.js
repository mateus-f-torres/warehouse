import React from 'react'

import {UserContext} from '../App/App'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'

import useDatabase from '../../hooks/useDatabase'
import './ProductsPage.css'

function ProductsPage() {
  const user = React.useContext(UserContext)
  const [list, {addProduct, removeProduct, updateProduct}] = useDatabase(user)
  const [productDetail, toggleDetail] = React.useState(null)

  function repeatedProductCheck(name) {
    return list.find(({product}) => product == name) !== undefined
  }

  return (
    <div className="productsPage">
      <div className="productsPage__header">
        <p>Olá {user.username}</p>
        <p>da empresa {user.company}</p>
      </div>
      {productDetail !== null && (
        <ProductForm
          addProduct={addProduct}
          removeProduct={removeProduct}
          updateProduct={updateProduct}
          toggleDetail={toggleDetail}
          detail={list.find(({id}) => id === productDetail)}
          checkForRepeatedProduct={repeatedProductCheck}
        />
      )}
      <ProductList list={list} toggleDetail={toggleDetail} />
    </div>
  )
}

export default ProductsPage
