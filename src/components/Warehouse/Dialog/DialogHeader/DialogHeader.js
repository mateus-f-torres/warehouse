import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import {makeStyles} from '@material-ui/core/styles'

const useDialogHeaderStyles = makeStyles({
  close: {
    position: 'absolute',
    right: '1rem',
    top: '0.75rem',
  },
})

function DialogHeader(props) {
  const classes = useDialogHeaderStyles()
  return (
    <DialogTitle>
      {props.detail
        ? `Editar: ${props.detail.product}`
        : 'Adicionar novo produto'}
      <IconButton className={classes.close} onClick={props.onClick}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  )
}

export default DialogHeader
