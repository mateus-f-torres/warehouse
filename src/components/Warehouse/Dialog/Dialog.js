import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import useTheme from '@material-ui/core/styles/useTheme'
import {useMediaQuery} from '@material-ui/core'

import DialogHeader from './DialogHeader/DialogHeader'
import DialogBody from './DialogBody/DialogBody'
import DialogFooter from './DialogFooter/DialogFooter'

import getInputs from './utils/getInputs'

function EnhancedDialog(props) {
  const theme = useTheme()
  const isXSScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const [errors, setErrors] = React.useState({})

  function handleSubmission(e) {
    e.preventDefault()
    const inputs = getInputs(e.target)

    if (!inputs.areValid()) {
      setErrors(inputs.getErrors())
    } else {
      props.onSubmit(inputs.getData())
      handleClose()
    }
  }

  function handleDeleteClick() {
    props.onDelete(props.detail.id)
    handleClose()
  }

  function handleClose() {
    setErrors({})
    props.onClose()
  }

  return (
    <Dialog fullScreen={isXSScreen} open={props.open} onClose={handleClose}>
      {props.open && (
        <form noValidate onSubmit={handleSubmission}>
          <DialogHeader detail={props.detail} onClick={handleClose} />
          <DialogBody detail={props.detail} errors={errors} />
          <DialogFooter detail={props.detail} onDelete={handleDeleteClick} />
        </form>
      )}
    </Dialog>
  )
}

export default EnhancedDialog
