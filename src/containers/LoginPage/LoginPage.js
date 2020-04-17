import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {useTheme} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'

import banner from '../../assets/images/banner.svg'
import useLoginPageStyles from './LoginPage.styles'

function LoginPage(props) {
  const theme = useTheme()
  const classes = useLoginPageStyles()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const containerClass = `${classes.login} ${
    !isSmallScreen ? classes['login-md'] : ''
  }`

  function handleSubmit(e) {
    e.preventDefault()
    const {username, company} = e.target
    props.onLogin([username.value, company.value])
  }

  return (
    <div className={containerClass}>
      <Typography
        variant={isSmallScreen ? 'h3' : 'h2'}
        component="h1"
        className={classes.title}
      >
        {isSmallScreen ? 'Warehouse' : 'Digital Warehouse'}
      </Typography>
      <img className={classes.banner} src={banner} alt="Warehouse Banner" />
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
    </div>
  )
}

export default LoginPage
