import React from 'react'
import {Snackbar, SnackbarContent} from '@material-ui/core'
import {NotificationContext} from '../../Warehouse'

function EnhancedSnackbar(props) {
  const [open, setOpen] = React.useState(false)
  const status = React.useContext(NotificationContext)

  React.useEffect(() => {
    status.message ? openSnackbar() : closeSnackbar()
  }, [status.verb])

  function openSnackbar() {
    setOpen(true)
  }

  function closeSnackbar() {
    setOpen(false)
    props.onBlur()
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackbar}>
      <SnackbarContent message={status.message} />
    </Snackbar>
  )
}

export default EnhancedSnackbar
