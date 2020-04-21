import React from 'react'

import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import {makeStyles} from '@material-ui/core/styles'
import {AsyncContext} from '../../Warehouse'

const useStyle = makeStyles({
  fab: {
    'position': 'fixed',
    'bottom': '1rem',
    'right': '1rem',
    'z-index': '10',
  },
})

function AddButton(props) {
  const classes = useStyle()
  const status = React.useContext(AsyncContext)

  return (
    <Zoom in={Boolean(status.verb)} timeout={300}>
      <Fab
        color="primary"
        aria-label="adicionar"
        className={classes.fab}
        onClick={props.onClick}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  )
}

export default AddButton
