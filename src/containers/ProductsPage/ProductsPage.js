import React from 'react'

import {UserContext} from '../App/App'
import ProductList from '../../components/ProductList'
import ProductForm from '../../components/ProductForm'

import useDatabase from '../../hooks/useDatabase'
import './ProductsPage.css'

function ProductsPage() {
  const user = React.useContext(UserContext)
  const [list, {addProduct, removeProduct, updateProduct}] = useDatabase(user)
  const [detail, toggleDetail] = React.useState(null)

  function repeatedProductCheck(name) {
    return list.find(({product}) => product == name) !== undefined
  }

  return (
    <div className="products">
      <div className="products__header">
        <p>Olá {user.username}</p>
        <p>da empresa {user.company}</p>
      </div>
      <ProductList
        list={list}
        loading={list === null}
        toggleDetail={toggleDetail}
      />
      {detail !== null && (
        <ProductForm
          addProduct={addProduct}
          removeProduct={removeProduct}
          updateProduct={updateProduct}
          toggleDetail={toggleDetail}
          detail={list.find(({id}) => id === detail)}
          checkForRepeatedProduct={repeatedProductCheck}
        />
      )}
    </div>
  )
}

export default ProductsPage
