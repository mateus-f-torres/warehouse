import React from 'react'
import {Box} from '@material-ui/core'

import TableContainer from './TableContainer/TableContainer'
import AppBar from './AppBar/AppBar'
import Dialog from './Dialog/Dialog'
import Floaters from './Floaters/Floaters'

import {UserContext} from '../App/App'
import useProductsList from '../../hooks/useProductsList/useProductsList'
import useNotification from '../../hooks/useNotifications/useNotifications'

export const NotificationContext = React.createContext()

function Warehouse(props) {
  const draft = React.useRef()
  const user = React.useContext(UserContext)

  const [notification, notify] = useNotification()
  const [products, dispatch] = useProductsList(user, draft, notify)

  const [dialogIsOpen, toggleDialog] = React.useState(false)
  const [edited, setEdited] = React.useState(null)

  function openDialogNewMode() {
    setEdited(null)
    toggleDialog(true)
  }

  function openDialogEditMode(id) {
    setEdited(products.list.find((item) => item.id === id))
    toggleDialog(true)
  }

  function closeDialog() {
    setEdited(null)
    toggleDialog(false)
  }

  function handleItemSubmission(data) {
    const formatted = format(data)
    edited === null
      ? dispatch.addItem(formatted)
      : dispatch.updateItem(edited.id, formatted)
  }

  return (
    <Box>
      <NotificationContext.Provider value={notification}>
        <AppBar
          onLogout={props.onLogout}
          onClearAllProducts={dispatch.clearList}
          onAddSingleRandomProduct={dispatch.addSingleRandomItem}
          onAddMultipleRandomProducts={dispatch.addMultipleRandomItems}
        />
        <Floaters
          handleOnAddClick={openDialogNewMode}
          handleSnackbarBlur={notify.reset}
        />
        <TableContainer
          data={products.list}
          dataRef={draft}
          onEdit={openDialogEditMode}
        />
        <Dialog
          open={dialogIsOpen}
          detail={edited}
          onClose={closeDialog}
          onDelete={dispatch.deleteItem}
          onSubmit={handleItemSubmission}
        />
      </NotificationContext.Provider>
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
