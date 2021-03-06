import React from 'react'
import {Button, DialogActions} from '@material-ui/core'

function DialogFooter(props) {
  return (
    <DialogActions>
      {props.detail && (
        <Button type="button" color="secondary" onClick={props.onDelete}>
          Deletar
        </Button>
      )}
      <Button type="submit" color="primary">
        {props.detail ? 'Editar' : 'Criar'}
      </Button>
    </DialogActions>
  )
}

export default DialogFooter
