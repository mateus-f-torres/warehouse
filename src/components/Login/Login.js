import React from 'react'
import Box from '@material-ui/core/Box'
import {useTheme} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'

import LoginTitle from './LoginTitle/LoginTitle'
import LoginBanner from './LoginBanner/LoginBanner'
import LoginForm from './LoginForm/LoginForm'

import useLoginStyles from './useLoginStyles'

function Login(props) {
  const theme = useTheme()
  const classes = useLoginStyles()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const containerClass = `${classes.login} ${
    !isSmallScreen ? classes['login-md'] : ''
  }`

  return (
    <Box className={containerClass}>
      <LoginTitle isSmallScreen={isSmallScreen} />
      <LoginBanner />
      <LoginForm onSubmit={props.onLogin} />
    </Box>
  )
}

export default Login
