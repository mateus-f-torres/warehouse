import React from 'react'
import Box from '@material-ui/core/Box'

import TableContainer from './TableContainer/TableContainer'
import AppBar from './AppBar/AppBar'
import Dialog from './Dialog/Dialog'
import Floaters from './Floaters/Floaters'

import {UserContext} from '../App/App'
import useDatabase from '../../hooks/useDatabase/useDatabase'

export const AsyncContext = React.createContext()

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
    <Box>
      <AsyncContext.Provider value={database.status}>
        <AppBar
          user={user}
          onLogout={props.onLogout}
          onClearAllProducts={dispatch.clearAllProducts}
        />
        <Floaters handleOnClick={openNewProductDialog} />
        <TableContainer
          data={database.list}
          dataRef={draft}
          onEdit={openDialogEditMode}
        />
        <Dialog
          open={dialogIsOpen}
          detail={productDetail}
          onClose={closeDialog}
          onDelete={dispatch.removeProduct}
          onSubmit={handleProductSubmission}
        />
      </AsyncContext.Provider>
    </Box>
  )
}

function format(product) {
  const stock = Number(product.stock.replace(/\./g, '').replace(',', '.'))
  const price = Number(product.price.replace(/\./g, '').replace(',', '.'))
  const total = Number((stock * price).toFixed(2))
  return {...product, stock, price, total}
}

export default Warehouse
