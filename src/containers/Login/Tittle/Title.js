import React from 'react'
import {Typography} from '@material-ui/core'

import useTitleStyles from './useTitleStyles'

function Title(props) {
  const classes = useTitleStyles()
  return (
    <Typography
      component="h1"
      className={classes.title}
      variant={props.isSmallScreen ? 'h3' : 'h2'}
    >
      Warehouse
    </Typography>
  )
}

export default Title
