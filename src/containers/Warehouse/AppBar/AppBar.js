import React from 'react'
import {
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
  title: {
    'text-transform': 'uppercase',
    'font-family': 'Montserrat Subrayada',
  },
  moreIcon: {
    'color': 'inherit',
    'margin-bottom': '0.125rem',
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
        <Typography className={classes.title} variant="h4" component="h2">
          Warehouse
        </Typography>
        <IconButton className={classes.moreIcon} onClick={setupAnchor}>
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
