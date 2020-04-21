import React from 'react'

import Header from './Header/Header'
import TableContainer from './TableContainer/TableContainer'
import Interactions from './Interactions'
import Dialog from './Dialog/Dialog'

import {UserContext} from '../App/App'
import useDatabase from '../../hooks/useDatabase'

function Warehouse(props) {
  const draft = React.useRef()
  const user = React.useContext(UserContext)
  const [database, dispatch] = useDatabase(user, draft)
  const [dialogIsOpen, toggleDialog] = React.useState(false)
  const [productDetail, setProductDetail] = React.useState(null)

  function openNewProductDialog() {
    setProductDetail(null)
    toggleDialog(true)
  }

  function openDialogEditMode(id) {
    setProductDetail(database.list.find((item) => item.id === id))
    toggleDialog(true)
  }

  function closeDialog() {
    setProductDetail(null)
    toggleDialog(false)
  }

  function handleProductSubmission(data) {
    const formatted = format(data)
    productDetail === null
      ? dispatch.addProduct(formatted)
      : dispatch.updateProduct(productDetail.id, formatted)
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
        onEdit={openDialogEditMode}
      />
      <Dialog
        open={dialogIsOpen}
        detail={productDetail}
        onClose={closeDialog}
        onDelete={dispatch.removeProduct}
        onSubmit={handleProductSubmission}
      />
    </div>
  )
}

function format(product) {
  const stock = Number(product.stock.replace(/\./g, '').replace(',', '.'))
  const price = Number(product.price.replace(/\./g, '').replace(',', '.'))
  const total = Number((stock * price).toFixed(2))
  return {...product, stock, price, total}
}

export default Warehouse
