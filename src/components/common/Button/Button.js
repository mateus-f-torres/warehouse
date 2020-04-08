import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <button className="w-button" type={props.type} onClick={props.onClick}>
      {props.label}
    </button>
  )
}

export default Button
