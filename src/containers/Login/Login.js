import React from 'react'
import {useTheme} from '@material-ui/core/styles'
import {Box, useMediaQuery} from '@material-ui/core'

import Title from './Tittle/Title'
import Banner from './Banner/Banner'
import Form from './Form/Form'

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
      <Title isSmallScreen={isSmallScreen} />
      <Banner />
      <Form onSubmit={props.onLogin} />
    </Box>
  )
}

export default Login
