import React from 'react'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'

import INPUTS from '../config/config'
import getDefaultValues from '../utils/getDefaultValues'

function DialogBody(props) {
  const defaultValue = getDefaultValues(props.detail)
  return (
    <DialogContent>
      {INPUTS.map((input) => (
        <TextField
          {...input}
          key={input.name}
          helperText={props.errors[input.name]}
          defaultValue={defaultValue[input.name]}
          error={Boolean(props.errors[input.name])}
        />
      ))}
    </DialogContent>
  )
}

export default DialogBody
