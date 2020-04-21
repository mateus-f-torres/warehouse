import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import useLoginFormStyles from './useLoginFormStyles'

function LoginForm(props) {
  const classes = useLoginFormStyles()

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

export default LoginForm
