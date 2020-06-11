import React from 'react'
import {
  Box,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
