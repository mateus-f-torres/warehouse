import React from 'react'

import {UserContext} from '../App/App'
import Table from '../../components/Table/Table'
import Form from '../../components/Form/Form'

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
      <Table list={list} loading={list === null} toggleDetail={toggleDetail} />
      {detail !== null && (
        <Form
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
