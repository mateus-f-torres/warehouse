function convertToNumber(str) {
  return Number(str.replace(/\./g, '').replace(',', '.'))
}

function validateProductPrice(e) {
  const input = e.target
  const price = input.value
  switch (true) {
    case input.validity.patternMismatch:
      input.setCustomValidity('Valor precisa ser numérico')
      input.checkValidity()
      break

    case convertToNumber(price) <= 0:
      input.setCustomValidity('Valor não pode ser 0')
      input.checkValidity()
      break

    default:
      input.setCustomValidity('')
      input.checkValidity()
      break
  }
}

export default validateProductPrice
