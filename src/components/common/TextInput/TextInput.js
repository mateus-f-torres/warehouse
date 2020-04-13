import React from 'react'
import './TextInput.css'

function TextInput(props) {
  return (
    <input
      type="text"
      className="w-input"
      id={props.id}
      name={props.name}
      pattern={props.pattern}
      required={props.required}
      autoFocus={props.autofocus}
      inputMode={props.inputmode}
      defaultValue={props.default}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
      onInput={props.onInput}
    />
  )
}

export default TextInput
