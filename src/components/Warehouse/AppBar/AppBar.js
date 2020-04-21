import React from 'react'

import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  toolbar: {
    'display': 'flex',
    'justify-content': 'space-between',
  },
  user: {
    'display': 'flex',
    'flex-direction': 'column',
  },
})

function EnhancedAppBar(props) {
  const [anchor, setAnchor] = React.useState(null)
  const open = Boolean(anchor)
  const classes = useStyle()

  function setupAnchor(e) {
    setAnchor(e.currentTarget)
  }
  function teardownAnchor() {
    setAnchor(null)
  }

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.user}>
          <Typography variant="h6" component="h2">
            Olá {props.user.username}
          </Typography>
          <Typography variant="subtitle1" component="h3">
            da empresa {props.user.company}
          </Typography>
        </Box>
        <IconButton onClick={setupAnchor}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={open} onClose={teardownAnchor}>
          <MenuItem onClick={props.onLogout}>Logout</MenuItem>
          <MenuItem onClick={props.onClearAllProducts}>Clear DB</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default EnhancedAppBar
