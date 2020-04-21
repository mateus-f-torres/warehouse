import React from 'react'
import Typography from '@material-ui/core/Typography'

import useLoginTitleStyles from './useLoginTitleStyles'

function LoginTitle(props) {
  const classes = useLoginTitleStyles()
  return (
    <Typography
      component="h1"
      className={classes.title}
      variant={props.isSmallScreen ? 'h3' : 'h2'}
    >
      {props.isSmallScreen ? 'Warehouse' : 'Digital Warehouse'}
    </Typography>
  )
}

export default LoginTitle
