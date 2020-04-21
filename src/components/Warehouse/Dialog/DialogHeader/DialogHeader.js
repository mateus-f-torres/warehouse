import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'

function DialogHeader(props) {
  return (
    <DialogTitle>
      {props.detail
        ? `Editar: ${props.detail.product}`
        : 'Adicionar novo produto'}
    </DialogTitle>
  )
}

export default DialogHeader
