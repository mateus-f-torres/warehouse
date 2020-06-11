import React from 'react'
import AddButton from './AddButton/AddButton'
import Snackbar from './Snackbar/Snackbar'

function Floaters(props) {
  return (
    <>
      <AddButton onClick={props.handleOnClick} />
      <Snackbar />
    </>
  )
}

export default Floaters
