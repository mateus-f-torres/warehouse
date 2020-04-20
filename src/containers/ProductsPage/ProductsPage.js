import React from 'react'

import Header from '../../components/Header'
import TableContainer from '../../components/TableContainer/TableContainer'
import Interactions from '../../components/Interactions'
import CustomDialog from '../../components/CustomDialog'

import {UserContext} from '../App/App'
import useDatabase from '../../hooks/useDatabase'

function ProductsPage(props) {
  const draft = React.useRef()
  const user = React.useContext(UserContext)
  const [database, dispatch] = useDatabase(user, draft)
  const [detail, toggleDetail] = React.useState(null)

  function openNewProductDialog() {
    toggleDetail({})
  }

  return (
    <div className="products">
      <Header
        user={user}
        onLogout={props.onLogout}
        onClearAllProducts={dispatch.clearAllProducts}
      />
      <Interactions
        status={database.status}
        request={database.request}
        handleOnClick={openNewProductDialog}
      />
      <TableContainer
        data={database.list}
        dataRef={draft}
        status={database.status}
        onEdit={toggleDetail}
      />
      <CustomDialog
        open={detail !== null}
        onClose={() => toggleDetail(null)}
        addProduct={dispatch.addProduct}
        removeProduct={dispatch.removeProduct}
        updateProduct={dispatch.updateProduct}
        toggleDetail={toggleDetail}
        detail={detail ? database.list.find(({id}) => id === detail) : null}
      />
    </div>
  )
}

export default ProductsPage
