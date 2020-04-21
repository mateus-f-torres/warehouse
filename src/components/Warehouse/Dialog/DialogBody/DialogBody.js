import React from 'react'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'

import {makeStyles} from '@material-ui/core/styles'

import INPUTS from '../config/config'
import getDefaultValues from '../utils/getDefaultValues'

const useDialogBodyStyles = makeStyles({
  content: {
    'display': 'grid',
    'grid-template-columns': 'minmax(auto, 400px)',
    'grid-auto-rows': '6rem',
  },
})

function DialogBody(props) {
  const defaultValue = getDefaultValues(props.detail)
  const classes = useDialogBodyStyles()

  return (
    <DialogContent className={classes.content}>
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
