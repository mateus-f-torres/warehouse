import React from 'react'
import Table from '../../components/Table/Table'

import useDatabase from '../../hooks/useDatabase'
import './ProductsPage.css'
import Header from '../../components/Header'
import {UserContext} from '../App/App'
import SmallScreenFAB from '../../components/SmallScreenFAB'
import CustomDialog from '../../components/CustomDialog'

function ProductsPage(props) {
  const user = React.useContext(UserContext)
  const [
    list,
    {addProduct, removeProduct, updateProduct, clearAllProducts},
  ] = useDatabase(user)
  const [detail, toggleDetail] = React.useState(null)

  function repeatedProductCheck(name) {
    return list.find(({product}) => product == name) !== undefined
  }

  return (
    <div className="products">
      <Header
        user={user}
        onLogout={props.onLogout}
        onClearAllProducts={clearAllProducts}
      />
      <Table list={list} loading={list === null} toggleDetail={toggleDetail} />
      <CustomDialog
        open={detail !== null}
        onClose={() => toggleDetail(null)}
        addProduct={addProduct}
        removeProduct={removeProduct}
        updateProduct={updateProduct}
        toggleDetail={toggleDetail}
        detail={detail ? list.find(({id}) => id === detail) : null}
        checkForRepeatedProduct={repeatedProductCheck}
      />
      <SmallScreenFAB
        visible={list !== null}
        onClick={() => toggleDetail({})}
      />
    </div>
  )
}

export default ProductsPage
