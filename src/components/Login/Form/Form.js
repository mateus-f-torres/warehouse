import React from 'react'
import {Button, TextField} from '@material-ui/core'

import useFormStyles from './useFormStyles'

function Form(props) {
  const classes = useFormStyles()

  function handleSubmit(e) {
    e.preventDefault()
    const {username, company} = e.target
    props.onSubmit([username.value, company.value])
  }

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.text}
        fullWidth
        required
        id="username"
        name="username"
        autoComplete="off"
        variant="outlined"
        placeholder="Usuário"
      />
      <TextField
        className={classes.text}
        fullWidth
        required
        id="company"
        name="company"
        autoComplete="off"
        variant="outlined"
        placeholder="Empresa"
      />
      <Button
        className={classes.btn}
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  )
}

export default Form
