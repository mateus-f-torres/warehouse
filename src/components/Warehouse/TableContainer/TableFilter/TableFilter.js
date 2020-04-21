import React from 'react'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  filter: {'margin-top': '5rem', 'margin-bottom': '1rem'},
})

function TableFilter(props) {
  const classes = useStyle()

  return (
    <TextField
      fullWidth
      placeholder="Buscar"
      onChange={props.onFilter}
      className={classes.filter}
    />
  )
}

export default TableFilter
