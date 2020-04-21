import {INPUT_NAMES} from '../config/config'

function getInputs(form) {
  const inputsArray = INPUT_NAMES.map((i) => form[i])
  return {
    areValid: () => allInputsAreValid(inputsArray),
    getData: () => getInputsValue(inputsArray),
    getErrors: () => getInputsErrorMessage(inputsArray),
  }
}

function allInputsAreValid(inputArray) {
  return inputArray.every((input) => input.validity.valid === true)
}

function getInputsValue(inputArray) {
  const obj = {}
  for (const input of inputArray) {
    obj[input.name] = input.value
  }
  return obj
}

function getInputsErrorMessage(inputArray) {
  const obj = {}
  for (const input of inputArray) {
    obj[input.name] = input.validationMessage
  }
  return obj
}

export default getInputs
