import React from 'react'
import {Snackbar, SnackbarContent} from '@material-ui/core'
import {NotificationContext} from '../../Warehouse'

function EnhancedSnackbar(props) {
  const [open, setOpen] = React.useState(false)
  const status = React.useContext(NotificationContext)

  React.useEffect(() => {
    if (status.verb && status.message) {
      openSnackbar()
    } else {
      closeSnackbar()
    }
  }, [status.verb])

  function openSnackbar() {
    setOpen(true)
  }

  function closeSnackbar() {
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackbar}>
      <SnackbarContent message={status.message} />
    </Snackbar>
  )
}

export default EnhancedSnackbar
