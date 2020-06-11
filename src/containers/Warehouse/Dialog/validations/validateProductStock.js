function convertToNumber(str) {
  return Number(str.replace(/\./g, '').replace(',', '.'))
}

function validateProductStock(e) {
  const input = e.target
  const stock = input.value
  switch (true) {
    case input.validity.patternMismatch:
      input.setCustomValidity('Estoque precisa ser numérico')
      input.checkValidity()
      break

    case convertToNumber(stock) <= 0:
      input.setCustomValidity('Estoque não pode ser 0')
      input.checkValidity()
      break

    default:
      input.setCustomValidity('')
      input.checkValidity()
      break
  }
}

export default validateProductStock
