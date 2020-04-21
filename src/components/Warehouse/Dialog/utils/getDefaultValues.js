import {INPUT_NAMES} from '../config/config'
import INPUT_FORMATTER from './formatter'

function getDefaultValues(product) {
  const obj = {}
  for (const key of INPUT_NAMES) {
    if (product) {
      obj[key] = INPUT_FORMATTER[key](product[key])
    } else {
      obj[key] = ''
    }
  }
  return obj
}

export default getDefaultValues
