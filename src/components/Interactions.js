import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

import {makeStyles, useTheme} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'

const useStyle = makeStyles({
  search: {'margin-top': '5rem', 'margin-bottom': '1rem'},
  fab: {
    'position': 'fixed',
    'bottom': '1rem',
    'right': '1rem',
    'z-index': '10',
  },
})

function Interactions(props) {
  const theme = useTheme()
  const classes = useStyle()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Buscar"
        onChange={props.handleFilter}
        className={classes.search}
      />
      {isSmallScreen ? (
        <Zoom in={!props.loading} timeout={300}>
          <Fab
            color="primary"
            aria-label="adicionar"
            className={classes.fab}
            onClick={props.handleAdd}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      ) : (
        <Button onClick={props.handleAdd}>adicionar</Button>
      )}
    </Box>
  )
}

export default Interactions
