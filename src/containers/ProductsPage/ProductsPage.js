import React from 'react'

import {UserContext} from '../App/App'
import Table from '../../components/Table/Table'
import Form from '../../components/Form/Form'

import useDatabase from '../../hooks/useDatabase'
import './ProductsPage.css'

function ProductsPage(props) {
  const user = React.useContext(UserContext)
  const [list, {addProduct, removeProduct, updateProduct}] = useDatabase(user)
  const [detail, toggleDetail] = React.useState(null)
  const [settings, toggleSettings] = React.useState(false)

  function repeatedProductCheck(name) {
    return list.find(({product}) => product == name) !== undefined
  }

  return (
    <div className="products">
      <div className="products__header">
        <p>Olá {user.username}</p>
        <p>da empresa {user.company}</p>
      </div>
      <button
        className="settings"
        onClick={() => {
          toggleSettings(true)
        }}
      >
        settings
      </button>
      <Table list={list} loading={list === null} toggleDetail={toggleDetail} />
      {settings && <button onClick={props.onLogout}>sair</button>}
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
