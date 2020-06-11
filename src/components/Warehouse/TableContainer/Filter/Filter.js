import React from 'react'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  filter: {'margin-top': '5rem', 'margin-bottom': '1rem'},
})

function Filter(props) {
  const classes = useStyle()

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        e.target.filter.blur()
      }}
    >
      <TextField
        fullWidth
        name="filter"
        autoComplete="off"
        placeholder="Buscar"
        onChange={props.onFilter}
        className={classes.filter}
      />
    </form>
  )
}

export default Filter
