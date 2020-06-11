import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import {makeStyles} from '@material-ui/core/styles'
import {DialogTitle, IconButton} from '@material-ui/core'

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
