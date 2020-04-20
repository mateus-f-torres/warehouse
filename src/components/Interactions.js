import React from 'react'

import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import AddIcon from '@material-ui/icons/Add'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  fab: {
    'position': 'fixed',
    'bottom': '1rem',
    'right': '1rem',
    'z-index': '10',
  },
})

function Interactions(props) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyle()

  React.useEffect(() => {
    if (props.request.status != 'IDLE') {
      setOpen(true)
    }
  }, [props.request.status])

  console.log(props.request)

  return (
    <>
      <Zoom in={props.status == 'RESOLVED'} timeout={300}>
        <Fab
          color="primary"
          aria-label="adicionar"
          className={classes.fab}
          onClick={props.handleOnClick}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <SnackbarContent>{props.request.message}</SnackbarContent>
      </Snackbar>
    </>
  )
}

export default Interactions
