import {INPUT_NAMES} from '../config/config'

function getInputs(form) {
  const inputsArray = INPUT_NAMES.map((i) => form[i])
  return {
    areValid: () => allInputsAreValid(inputsArray),
    getData: () => getInputsValue(inputsArray),
    getErrors: () => getInputsErrorMessage(inputsArray),
  }
}

function allInputsAreValid(inputsArray) {
  return inputsArray.every((input) => input.validity.valid === true)
}

function getInputsValue(inputsArray) {
  return Object.fromEntries(inputsArray.map((i) => [i.name, i.value]))
}

function getInputsErrorMessage(inputsArray) {
  return Object.fromEntries(
    inputsArray.map((i) => [i.name, i.validationMessage]),
  )
}

export default getInputs
